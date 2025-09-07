import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:4201', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Store user connections and their status
const connectedUsers = new Map<
  string,
  {
    socketId: string;
    userId: string;
    status: 'online' | 'away' | 'offline';
    lastSeen: Date;
    currentPage: string;
    matchIds: string[];
  }
>();

// Store typing indicators
const typingUsers = new Map<string, Set<string>>(); // matchId -> Set of userIds typing

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  // User authentication and setup
  socket.on('authenticate', (data: { userId: string; matchIds: string[]; currentPage?: string }) => {
    const { userId, matchIds, currentPage = 'chat' } = data;

    // Store user connection info
    connectedUsers.set(userId, {
      socketId: socket.id,
      userId,
      status: 'online',
      lastSeen: new Date(),
      currentPage,
      matchIds,
    });

    // Join user to their personal room
    socket.join(`user_${userId}`);

    // Join all match rooms
    matchIds.forEach((matchId) => {
      socket.join(matchId);
      console.log(`📥 User ${userId} joined match room ${matchId}`);
    });

    // Notify other users that this user is online
    matchIds.forEach((matchId) => {
      socket.to(matchId).emit('user_status_changed', {
        userId,
        status: 'online',
        lastSeen: new Date(),
      });
    });

    // ✅ Send statuses of all matched users to the authenticated user
    const matchStatuses: Record<string, { status: string; lastSeen: Date }> = {};

    for (const [otherUserId, userData] of connectedUsers.entries()) {
      if (otherUserId !== userId) {
        const sharedMatch = userData.matchIds.find((id) => matchIds.includes(id));
        if (sharedMatch) {
          matchStatuses[otherUserId] = {
            status: userData.status,
            lastSeen: userData.lastSeen,
          };
        }
      }
    }

    socket.emit('userStatuses', matchStatuses);

    console.log(`✅ User ${userId} authenticated and joined ${matchIds.length} rooms`);
  });

  // Update user's current page
  socket.on('page_changed', (data: { userId: string; currentPage: string }) => {
    const userConnection = connectedUsers.get(data.userId);
    if (userConnection) {
      userConnection.currentPage = data.currentPage;
      connectedUsers.set(data.userId, userConnection);
    }
  });

  socket.on('user_liked', (data: { likedBy: string; likedUserId: string }) => {
    const { likedBy, likedUserId } = data;
    console.log(`👍 User ${likedBy} liked User ${likedUserId}`);

    io.to(`user_${likedUserId}`).emit('liked_notification', {
      fromUserId: likedBy,
      timestamp: new Date(),
    });
  });
  socket.on('user_disliked', (data: { dislikedBy: string; dislikedUserId: string }) => {
    const { dislikedBy, dislikedUserId } = data;
    console.log(`👎 User ${dislikedBy} disliked User ${dislikedUserId}`);

    io.to(`user_${dislikedUserId}`).emit('disliked_notification', {
      fromUserId: dislikedBy,
      timestamp: new Date(),
    });
  });

  // Handle new match creation
  socket.on('match_created', (data: { matchIds: string[]; matchedUsers: { id: string; name?: string }[] }) => {
    const { matchIds, matchedUsers } = data;
    console.log(`💕 Match created between users: ${matchIds.join(', ')}`);

    // Join the socket to the new match room(s) if not already joined
    matchIds.forEach((matchId) => {
      socket.join(matchId);
      console.log(`📥 Socket ${socket.id} joined match room ${matchId}`);
    });

    // Notify all matched users about the new match
    matchedUsers.forEach((user) => {
      io.to(`user_${user.id}`).emit('match_created', {
        matchedUsers,
        timestamp: new Date(),
      });
    });
  });
  // Handle chat messages with enhanced features
  socket.on('chat_message', (data: { matchId: string; content: string; senderId: string; receiverId: string; messageId?: string; tempId?: string; timestamp: string }) => {
    const { matchId, content, senderId, receiverId, messageId, tempId, timestamp } = data;

    const receiverConnection = connectedUsers.get(receiverId);
    const isReceiverOnChatPage = receiverConnection?.currentPage === 'chat';

    // Enhanced message object
    const messageData = {
      matchId,
      content,
      senderId,
      receiverId,
      messageId: messageId || `msg_${Date.now()}`,
      tempId,
      timestamp,
      delivered: true,
      seen: isReceiverOnChatPage, // Auto-mark as seen if receiver is on chat page
    };

    // Send to match room (both users)
    io.to(matchId).emit('chat_message_received', messageData);

    // Send notification if receiver is not on chat page or offline
    if (!isReceiverOnChatPage || !receiverConnection) {
      io.to(`user_${receiverId}`).emit('new_message_notification', {
        matchId,
        senderId,
        senderName: 'User', // You should pass sender name
        content: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        timestamp,
        type: 'message',
      });
    }

    console.log(`📨 Message sent in room ${matchId}: ${content}`);
  });

  // Handle message delivery confirmation
  socket.on('message_delivered', (data: { matchId: string; messageId: string; userId: string }) => {
    socket.to(data.matchId).emit('message_delivery_confirmed', {
      matchId: data.matchId,
      messageId: data.messageId,
      deliveredTo: data.userId,
      deliveredAt: new Date(),
    });
  });

  // Handle seen messages with smooth updates
  socket.on('messages_seen', (data: { matchId: string; userId: string; messageIds: string[] }) => {
    const { matchId, userId, messageIds } = data;

    // Smoothly update seen status with a slight delay for better UX
    setTimeout(() => {
      socket.to(matchId).emit('messages_seen_update', {
        matchId,
        userId,
        messageIds,
        seenAt: new Date(),
      });
    }, 300); // Small delay for smooth experience

    console.log(`👁️ Messages seen in room ${matchId} by user ${userId}`);
  });

  // Handle typing indicators
  socket.on('typing_start', (data: { matchId: string; userId: string }) => {
    const { matchId, userId } = data;

    if (!typingUsers.has(matchId)) {
      typingUsers.set(matchId, new Set());
    }
    typingUsers.get(matchId)!.add(userId);

    socket.to(matchId).emit('user_typing', {
      matchId,
      userId,
      isTyping: true,
    });
  });

  socket.on('typing_stop', (data: { matchId: string; userId: string }) => {
    const { matchId, userId } = data;

    if (typingUsers.has(matchId)) {
      typingUsers.get(matchId)!.delete(userId);
    }

    socket.to(matchId).emit('user_typing', {
      matchId,
      userId,
      isTyping: false,
    });
  });

  // Handle unmatch with proper cleanup
  socket.on('unmatch_initiated', (data: { matchId: string; initiatorId: string; targetId: string }) => {
    const { matchId, initiatorId, targetId } = data;

    // Notify both users about the unmatch
    io.to(matchId).emit('match_removed', {
      matchId,
      initiatedBy: initiatorId,
      timestamp: new Date(),
    });

    // Send notification to the target user if they're not on chat page
    const targetConnection = connectedUsers.get(targetId);
    if (!targetConnection || targetConnection.currentPage !== 'chat') {
      io.to(`user_${targetId}`).emit('unmatch_notification', {
        matchId,
        message: 'Someone unmatched with you',
        timestamp: new Date(),
        type: 'unmatch',
      });
    }

    // Clean up rooms and typing indicators
    setTimeout(() => {
      io.in(matchId).socketsLeave(matchId);
      typingUsers.delete(matchId);
    }, 1000);

    console.log(`💔 Unmatch initiated in room ${matchId} by ${initiatorId}`);
  });

  // Join specific room (for dynamic room joining)
  socket.on('join_room', (matchId: string) => {
    socket.join(matchId);
    console.log(`📥 Socket ${socket.id} joined room ${matchId}`);
  });

  // Leave specific room
  socket.on('leave_room', (matchId: string) => {
    socket.leave(matchId);
    console.log(`📤 Socket ${socket.id} left room ${matchId}`);
  });

  // Update user status (online, away, offline)
  socket.on('status_update', (data: { userId: string; status: 'online' | 'away' | 'offline' }) => {
    const { userId, status } = data;
    const userConnection = connectedUsers.get(userId);

    if (userConnection) {
      userConnection.status = status;
      userConnection.lastSeen = new Date();
      connectedUsers.set(userId, userConnection);

      // Notify all matches about status change
      userConnection.matchIds.forEach((matchId) => {
        socket.to(matchId).emit('user_status_changed', {
          userId,
          status,
          lastSeen: new Date(),
        });
      });
    }
  });

  // Handle user going offline or disconnecting
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);

    // Find user by socket ID and update status
    for (const [userId, connection] of connectedUsers.entries()) {
      if (connection.socketId === socket.id) {
        connection.status = 'offline';
        connection.lastSeen = new Date();
        connectedUsers.set(userId, connection);

        // Notify all matches that user went offline
        connection.matchIds.forEach((matchId) => {
          socket.to(matchId).emit('user_status_changed', {
            userId,
            status: 'offline',
            lastSeen: new Date(),
          });
        });
        break;
      }
    }
  });

  // Handle connection errors
  socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
  });
});

// API endpoint to check server status
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    connectedUsers: connectedUsers.size,
    timestamp: new Date(),
  });
});

// API endpoint to get user status
app.get('/user-status/:userId', (req, res) => {
  const { userId } = req.params;
  const userConnection = connectedUsers.get(userId);

  if (userConnection) {
    res.json({
      userId,
      status: userConnection.status,
      lastSeen: userConnection.lastSeen,
      currentPage: userConnection.currentPage,
    });
  } else {
    res.json({
      userId,
      status: 'offline',
      lastSeen: null,
      currentPage: null,
    });
  }
});

// Cleanup typing indicators periodically
setInterval(() => {
  // Clear stale typing indicators (older than 5 seconds)
  const now = Date.now();
  for (const [matchId, typingUsersSet] of typingUsers.entries()) {
    if (typingUsersSet.size === 0) {
      typingUsers.delete(matchId);
    }
  }
}, 5000);

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Enhanced Socket.IO server running on port ${PORT}`);
});

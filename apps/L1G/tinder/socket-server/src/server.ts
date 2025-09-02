import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4201',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  // Join a single room
  socket.on('join room', (matchId: string) => {
    socket.join(matchId);
    console.log(`📥 Socket ${socket.id} joined room ${matchId}`);
  });

  // Join multiple rooms at once
  socket.on('joinRooms', (roomIds: string[]) => {
    if (!Array.isArray(roomIds)) {
      console.warn(`⚠️ joinRooms expects an array of strings`);
      return;
    }
    roomIds.forEach((roomId) => {
      socket.join(roomId);
      console.log(`📥 Socket ${socket.id} joined room ${roomId}`);
    });
  });

  // Handle chat message
  socket.on('chat message', (msg) => {
    const { matchId, content, senderId, receiverId } = msg;
    console.log(`📨 Message in room ${matchId}: ${content}`);
    io.to(matchId).emit('chat message', msg); // Broadcast to the room
  });

  // Handle seen message update
  socket.on('seen messages', ({ matchId, userId }) => {
    console.log(`👁️ Messages seen in room ${matchId} by user ${userId}`);
    socket.to(matchId).emit('messages seen update', { matchId, userId });
  });

  // Handle unmatch event
  socket.on('unmatch', (matchId: string) => {
    console.log(`🚫 Unmatch event triggered in room ${matchId}`);

    // Notify both users in the room about the unmatch
    socket.to(matchId).emit('unmatched', matchId);

    // Optionally, remove users from the room (depending on your use case)
    socket.leave(matchId);
    console.log(`📤 Socket ${socket.id} left room ${matchId}`);
  });

  // Leave room
  socket.on('leave room', (matchId: string) => {
    socket.leave(matchId);
    console.log(`📤 Socket ${socket.id} left room ${matchId}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});

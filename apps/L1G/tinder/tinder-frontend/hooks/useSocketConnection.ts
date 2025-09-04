/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
/* eslint-disable max-lines */
 
import { useEffect, useCallback, useRef } from 'react';
import { ChatUser, Message } from 'types/chat';
import { socket } from 'utils/socket';
 
interface UseSocketConnectionProps {
  selectedUser: ChatUser | null;
  data: any;
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setSocketError: React.Dispatch<React.SetStateAction<string | null>>;
  setUserStatuses: React.Dispatch<React.SetStateAction<Record<string, { status: 'online' | 'away' | 'offline'; lastSeen: string }>>>;
  markMessagesAsSeen: () => void;
  handleUnmatched: (matchId: string) => void;
  onNewMatch?: (matchData: any) => void;
  onNotification?: (notification: any) => void;
  currentPage?: string;
  setTypingUsers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}
export const useSocketConnection = ({
  selectedUser,
  data,
  setConversations,
  setSocketError,
  setUserStatuses,
  markMessagesAsSeen,
  handleUnmatched,
  onNewMatch,
  onNotification,
  setTypingUsers,
  currentPage = 'chat',
}: UseSocketConnectionProps) => {
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const isAuthenticatedRef = useRef(false);
 
  // Smooth message animation helper
  const addMessageWithAnimation = useCallback(
    (matchId: string, newMessage: Message) => {
      setConversations((prev) => {
        const existingMessages = prev[matchId] || [];
 
        // Check for duplicates
        const isDuplicate = existingMessages.some(
          (msg) => msg.id === newMessage.id || (msg.text === newMessage.text && Math.abs(new Date(msg.timestamp).getTime() - new Date(newMessage.timestamp).getTime()) < 1000)
        );
 
        if (isDuplicate) return prev;
 
        // Add message with smooth transition
        const updatedMessages = [...existingMessages, newMessage].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
 
        return { ...prev, [matchId]: updatedMessages };
      });
    },
    [setConversations]
  );
 
  // Authentication function
  const authenticateSocket = useCallback(() => {
    if (!data?.getMe?.id || !data?.getMe?.matchIds || isAuthenticatedRef.current) return;
 
    const userId = data.getMe.id;
    const matchIds = data.getMe.matchIds.map((match: any) => match.id);
 
    // Get all matched user IDs
    const matchedUserIds = data.getMe.matchIds.map((match: any) => match?.matchedUser?.id).filter(Boolean);
 
    try {
      socket.emit('authenticate', {
        userId,
        matchIds,
        currentPage,
      });
 
      // IMPORTANT: Request current status of all users immediately after auth
      setTimeout(() => {
        socket.emit('get_users_status', { userIds: matchedUserIds });
      }, 100);
 
      isAuthenticatedRef.current = true;
      console.log('✅ Socket authenticated, requesting statuses for:', matchedUserIds);
    } catch (err) {
      console.error('❌ Failed to authenticate socket:', err);
      setSocketError('Failed to connect to chat. Please try again.');
    }
  }, [data, currentPage, setSocketError]);
 
  // Update current page
  useEffect(() => {
    if (isAuthenticatedRef.current && data?.getMe?.id) {
      socket.emit('page_changed', {
        userId: data.getMe.id,
        currentPage,
      });
    }
  }, [currentPage, data?.getMe?.id]);
 
  // Main socket effect
  useEffect(() => {
    if (!data?.getMe?.id) return;
 
    const userId = data.getMe.id;
    const matchIds = data.getMe.matchIds?.map((match: any) => match.id) || [];
 
    // Connect and authenticate
    if (socket.connected) {
      authenticateSocket();
    } else {
      socket.connect();
    }
 
    // Handle connection events
    const handleConnect = () => {
      console.log('✅ Socket connected');
      authenticateSocket();
    };
 
    const handleDisconnect = (reason: string) => {
      console.log('❌ Socket disconnected:', reason);
      isAuthenticatedRef.current = false;
 
      if (reason === 'io server disconnect') {
        // Server disconnected, need manual reconnection
        socket.connect();
      }
    };
 
    const handleConnectError = (error: Error) => {
      console.error('❌ Socket connection error:', error);
      reconnectAttempts.current++;
 
      if (reconnectAttempts.current >= maxReconnectAttempts) {
        setSocketError('Unable to connect to chat. Please refresh the page.');
      }
    };
 
    // Enhanced chat message handler with smooth updates
    const handleChatMessage = (messageData: {
      matchId: string;
      content: string;
      senderId: string;
      receiverId: string;
      messageId: string;
      tempId?: string;
      timestamp: string;
      delivered: boolean;
      seen: boolean;
    }) => {
      const { matchId, content, senderId, receiverId, messageId, tempId, timestamp, seen } = messageData;
 
      // Only handle messages not sent by current user
      if (senderId === userId) {
        // Handle delivery confirmation for our own messages
        if (tempId) {
          setConversations((prev) => ({
            ...prev,
            [matchId]: (prev[matchId] || []).map((msg) => (msg.id === tempId ? { ...msg, id: messageId, delivered: true } : msg)),
          }));
        }
        return;
      }
 
      // Create message object
      const newMessage: Message = {
        id: messageId,
        text: content,
        sender: 'them',
        timestamp: new Date(timestamp).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        seen: false, // Will be updated when user sees it
        delivered: true, // Already marked as delivered
        sending: false, // Since it's incoming, it's already sent
        failed: false, // Not failed
        retrying: false, // Not retrying
      };
 
      // Add message with smooth animation
      setTimeout(() => {
        addMessageWithAnimation(matchId, newMessage);
 
        // Auto-mark as seen if user is viewing this chat
        if (selectedUser?.id === matchId && currentPage === 'chat') {
          setTimeout(() => {
            markMessagesAsSeen();
          }, 500);
        }
      }, 100); // Small delay for smooth appearance
 
      // Emit delivery confirmation
      socket.emit('message_delivered', {
        matchId,
        messageId,
        userId,
      });
    };
 
    // Handle message seen updates with smooth transitions
    const handleSeenUpdate = ({ matchId, userId: seenUserId, messageIds, seenAt }: { matchId: string; userId: string; messageIds: string[]; seenAt: string }) => {
      if (seenUserId === userId) return; // Ignore own seen updates
 
      // Smooth seen status update
      setTimeout(() => {
        setConversations((prev) => {
          const messages = prev[matchId] || [];
          const updatedMessages = messages.map((msg) => {
            if (msg.sender === 'me' && messageIds.includes(msg.id)) {
              return { ...msg, seen: true };
            }
            return msg;
          });
          return { ...prev, [matchId]: updatedMessages };
        });
      }, 200);
    };
 
    // Handle new match notifications
    const handleNewMatch = (matchData: { matchId: string; matchedUser: any; timestamp: string }) => {
      // Add new match to rooms
      socket.emit('join_room', matchData.matchId);
 
      if (onNewMatch) {
        onNewMatch(matchData);
      }
 
      // Show notification if not on chat page
      if (currentPage !== 'chat' && onNotification) {
        onNotification({
          type: 'match',
          title: 'New Match! 💕',
          message: `You matched with ${matchData.matchedUser.name}!`,
          timestamp: matchData.timestamp,
        });
      }
    };
 
    // Handle unmatch events
    const handleUnmatchedEvent = (data: { matchId: string; initiatedBy: string; timestamp: string }) => {
      if (data.initiatedBy !== userId) {
        if (onNotification) {
          onNotification({
            type: 'unmatch',
            title: 'Match Removed',
            message: 'Someone unmatched with you',
            timestamp: data.timestamp,
          });
        }
      }
 
      handleUnmatched(data.matchId);
      socket.emit('leave_room', data.matchId);
    };
 
    // Handle typing indicators
    const handleUserTyping = ({ matchId, userId: typingUserId, isTyping }: { matchId: string; userId: string; isTyping: boolean }) => {
      if (typingUserId === userId) return;
 
      setTypingUsers((prev) => ({
        ...prev,
        [matchId]: isTyping,
      }));
 
      console.log(`User ${typingUserId} is ${isTyping ? 'typing' : 'stopped typing'} in match ${matchId}`);
    };
 
    // Handle user status changes
    const handleUserStatusChanged = ({ userId: statusUserId, status, lastSeen }: { userId: string; status: 'online' | 'away' | 'offline'; lastSeen: string }) => {
      if (statusUserId === userId) return;
 
      console.log(`🟢 User ${statusUserId} is now ${status}`);
 
      setUserStatuses((prev) => ({
        ...prev,
        [statusUserId]: {
          status,
          lastSeen,
        },
      }));
    };
 
    // Handle notifications when not on chat page
    const handleNotification = (notification: { type: string; title: string; message: string; matchId?: string; senderId?: string; timestamp: string }) => {
      if (onNotification) {
        onNotification(notification);
      }
    };
 
    // Register event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('chat_message_received', handleChatMessage);
    socket.on('messages_seen_update', handleSeenUpdate);
    socket.on('match_created', handleNewMatch);
    socket.on('match_removed', handleUnmatchedEvent);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_status_changed', handleUserStatusChanged);
    socket.on('new_message_notification', handleNotification);
    socket.on('unmatch_notification', handleNotification);
 
    // Cleanup function
    return () => {
      // Remove event listeners
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('chat_message_received', handleChatMessage);
      socket.off('messages_seen_update', handleSeenUpdate);
      socket.off('match_created', handleNewMatch);
      socket.off('match_removed', handleUnmatchedEvent);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_status_changed', handleUserStatusChanged);
      socket.off('new_message_notification', handleNotification);
      socket.off('unmatch_notification', handleNotification);
 
      // Leave all rooms
      matchIds.forEach((matchId: string) => {
        socket.emit('leave_room', matchId);
      });
 
      isAuthenticatedRef.current = false;
    };
  }, [data, currentPage, selectedUser, markMessagesAsSeen, handleUnmatched, onNewMatch, onNotification, addMessageWithAnimation, authenticateSocket, setSocketError]);
 
  // Mark messages as seen when selected user changes
  useEffect(() => {
    if (selectedUser && currentPage === 'chat') {
      const timeoutId = setTimeout(() => {
        markMessagesAsSeen();
      }, 500);
 
      return () => clearTimeout(timeoutId);
    }
  }, [selectedUser, currentPage, markMessagesAsSeen]);
};
 
 
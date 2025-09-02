import { useEffect, useCallback } from 'react';
import { ChatUser, Message } from 'types/chat';
import { socket } from 'utils/socket';

interface UseSocketConnectionProps {
  selectedUser: ChatUser | null;
  data: any;
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setSocketError: React.Dispatch<React.SetStateAction<string | null>>;
  markMessagesAsSeen: () => void;
  handleUnmatched: (_matchId: string) => void;
}

export const useSocketConnection = ({ selectedUser, data, setConversations, setSocketError, markMessagesAsSeen, handleUnmatched }: UseSocketConnectionProps) => {
  const generateTimestamp = useCallback(
    (): string =>
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    []
  );

  useEffect(() => {
    if (!data?.getMe?.id) return; // No user logged in, no connection

    // Get array of match IDs (rooms) to join, join all at once
    const roomsToJoin: string[] = data.getMe.matchIds?.map((match: any) => match.id) || [];

    if (roomsToJoin.length === 0) return; // No rooms to join

    try {
      socket.emit('joinRooms', roomsToJoin);
    } catch (err) {
      console.error('Failed to join rooms:', err);
      setSocketError('Failed to connect to chat rooms. Please try again.');
    }

    const timeout = setTimeout(() => {
      markMessagesAsSeen();
    }, 500);

    // Handle incoming chat messages for any joined room
    const handleChatMessage = (msg: { matchId: string; content: string; senderId: string; receiverId: string }) => {
      // Only update conversation if message is from a room we're in AND sender is not me
      if (roomsToJoin.includes(msg.matchId) && msg.senderId !== data.getMe.id) {
        setConversations((prev) => ({
          ...prev,
          [msg.matchId]: [
            ...(prev[msg.matchId] || []),
            {
              id: Date.now(),
              text: msg.content,
              sender: 'them',
              timestamp: generateTimestamp(),
            },
          ],
        }));
      }
    };

    // Handle seen messages update for any joined room
    const handleSeenUpdate = ({ matchId: updatedMatchId, userId: seenUserId }: { matchId: string; userId: string }) => {
      if (roomsToJoin.includes(updatedMatchId) && seenUserId !== data.getMe.id) {
        setConversations((prev) => {
          const messagesForMatch = prev[updatedMatchId] || [];
          const updatedMessages = messagesForMatch.map((msg) => {
            if (msg.sender === 'me' && !msg.seen) {
              return { ...msg, seen: true };
            }
            return msg;
          });
          return { ...prev, [updatedMatchId]: updatedMessages };
        });
      }
    };

    // Handle unmatched event for any joined room
    const handleUnmatchedEvent = (matchId: string) => {
      if (roomsToJoin.includes(matchId)) {
        handleUnmatched(matchId);
      }
    };

    socket.on('chat message', handleChatMessage);
    socket.on('messages seen update', handleSeenUpdate);
    socket.on('unmatched', handleUnmatchedEvent);

    return () => {
      try {
        roomsToJoin.forEach((room) => {
          socket.emit('leave room', room);
        });
      } catch (err) {
        console.error('Failed to leave rooms:', err);
      }
      socket.off('chat message', handleChatMessage);
      socket.off('messages seen update', handleSeenUpdate);
      socket.off('unmatched', handleUnmatchedEvent);
      clearTimeout(timeout);
    };
  }, [data, setConversations, setSocketError, markMessagesAsSeen, handleUnmatched, generateTimestamp]);
};

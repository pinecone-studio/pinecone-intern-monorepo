import { useEffect, useCallback } from 'react';
import { ChatUser, Message } from 'types/chat';
import { socket } from 'utils/socket';

interface UseSocketConnectionProps {
  selectedUser: ChatUser | null;
  data: any;
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setSocketError: React.Dispatch<React.SetStateAction<string | null>>;
  markMessagesAsSeen: () => void;
  handleUnmatched: (matchId: string) => void;
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
    if (!selectedUser || !data?.getMe?.id) return;

    const matchId = selectedUser.id;
    const userId = data.getMe.id;

    try {
      socket.emit('join room', matchId);
    } catch (err) {
      console.error('Failed to join room:', err);
      setSocketError('Failed to connect to chat. Please try again.');
    }

    const timeout = setTimeout(() => {
      markMessagesAsSeen();
    }, 500);

    const handleChatMessage = (msg: { matchId: string; content: string; senderId: string; receiverId: string }) => {
      if (msg.matchId === matchId && msg.senderId !== data?.getMe?.id) {
        setConversations((prev) => ({
          ...prev,
          [matchId]: [
            ...(prev[matchId] || []),
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

    const handleSeenUpdate = ({ matchId: updatedMatchId, userId: seenUserId }: { matchId: string; userId: string }) => {
      if (updatedMatchId === matchId && seenUserId !== userId) {
        setConversations((prev) => {
          const messagesForMatch = prev[matchId] || [];
          const updatedMessages = messagesForMatch.map((msg) => {
            if (msg.sender === 'me' && !msg.seen) {
              return { ...msg, seen: true };
            }
            return msg;
          });
          return { ...prev, [matchId]: updatedMessages };
        });
      }
    };
    const handleUnmatchedEvent = (matchId: string) => {
      if (matchId === selectedUser?.id) {
        handleUnmatched(matchId);
      }
    };

    socket.on('chat message', handleChatMessage);
    socket.on('messages seen update', handleSeenUpdate);
    socket.on('unmatched', handleUnmatchedEvent);
    return () => {
      try {
        socket.emit('leave room', matchId);
      } catch (err) {
        console.error('Failed to leave room:', err);
      }
      socket.off('chat message', handleChatMessage);
      socket.off('messages seen update', handleSeenUpdate);
      socket.off('unmatched', handleUnmatchedEvent);
      clearTimeout(timeout);
    };
  }, [selectedUser, data, setConversations, setSocketError, markMessagesAsSeen, generateTimestamp]);
};

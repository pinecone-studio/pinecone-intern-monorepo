import { useCallback } from 'react';
import { useMarkMessagesAsSeenMutation } from '@/generated';
import { Message } from 'types/chat';

export const useMarkMessagesAsSeen = (selectedUser: any, data: any, setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>) => {
  const [markMessagesAsSeenMutation] = useMarkMessagesAsSeenMutation();

  const markMessagesAsSeen = useCallback(async () => {
    if (!selectedUser || !data?.getMe.id) return;
    const matchId = selectedUser.id;
    const userId = data.getMe.id;
    try {
      await markMessagesAsSeenMutation({ variables: { matchId, userId } });
      setConversations((prev) => {
        const messagesForMatch = prev[matchId];
        const updatedMessages = messagesForMatch.map((msg) => {
          if (msg.sender === 'them' && !msg.seen) {
            return { ...msg, seen: true };
          }
          return msg;
        });
        return { ...prev, [matchId]: updatedMessages };
      });
    } catch (error) {
      console.error('Failed to mark messages as seen:', error);
    }
  }, [selectedUser, data, markMessagesAsSeenMutation, setConversations]);

  return markMessagesAsSeen;
};

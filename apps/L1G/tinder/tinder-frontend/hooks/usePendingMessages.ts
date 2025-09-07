import { useEffect } from 'react';
import { Message } from 'types/chat';

interface UsePendingMessagesProps {
  data: any;
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setChattedUsers: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const usePendingMessages = ({ data, setConversations, setChattedUsers }: UsePendingMessagesProps) => {
  useEffect(() => {
    if (!data?.getMe?.matchIds) return;

    const matchIds = data.getMe.matchIds.map((match: any) => match.id);
    let foundPendingMessages = false;

    // Check for pending messages from MatchPopup
    matchIds.forEach((matchId: string) => {
      const storageKey = `pending_message_${matchId}`;

      try {
        const storedMessage = localStorage.getItem(storageKey);
        if (storedMessage) {
          const pendingMessage: Message = JSON.parse(storedMessage);

          console.log('Found pending message for match:', matchId, pendingMessage);

          // Add to conversations
          setConversations((prev) => {
            const existingMessages = prev[matchId] || [];

            // Check if message already exists
            const messageExists = existingMessages.some((msg) => msg.id === pendingMessage.id);
            if (messageExists) {
              return prev;
            }

            return {
              ...prev,
              [matchId]: [...existingMessages, pendingMessage],
            };
          });

          // Add to chatted users
          setChattedUsers((prev) => new Set(prev).add(matchId));

          // Remove from localStorage after loading
          localStorage.removeItem(storageKey);
          foundPendingMessages = true;
        }
      } catch (error) {
        console.error('Error loading pending message:', error);
        // Clean up corrupted data
        localStorage.removeItem(storageKey);
      }
    });

    if (foundPendingMessages) {
      console.log('Loaded pending messages from MatchPopup');
    }
  }, [data?.getMe?.matchIds, setConversations, setChattedUsers]);
};

import { useEffect } from 'react';
import { Match } from '@/generated';
import type { Message } from 'types/chat';
 
export const useConversationsLoader = (
  data: any,
  fetchChat: any,
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>,
  setChatLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  useEffect(() => {
    if (!data?.getMe?.id || !data.getMe.matchIds) return;
    // eslint-disable-next-line complexity
    const loadConversations = async () => {
      const userId = data?.getMe?.id;
      if (!userId || !Array.isArray(data?.getMe?.matchIds)) return;
 
      const matches = data.getMe.matchIds.filter((match: Match): match is NonNullable<typeof match> => !!match);
 
      for (const match of matches) {
        const participantId = match.matchedUser?.id;
        if (!participantId) continue;
 
        try {
          setChatLoading((prev) => ({ ...prev, [match.id]: true }));
          const result = await fetchChat({
            variables: { userId, participantId },
            fetchPolicy: 'cache-and-network',
          });
 
          if (result.data?.getChatWithUser) {
            const serverMessages: Message[] = result.data.getChatWithUser.messages.map(
              (msg: any): Message => ({
                id: msg.id,
                text: msg.content,
                sender: msg.senderId === userId ? 'me' : 'them',
                timestamp: new Date(msg.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }),
                seen: msg.seen,
                delivered: true,
                sending: false,
                failed: false,
                retrying: false,
              })
            );
 
            setConversations((prev) => ({
              ...prev,
              [match.id]: serverMessages.sort((a, b) => new Date(`2000-01-01 ${a.timestamp}`).getTime() - new Date(`2000-01-01 ${b.timestamp}`).getTime()),
            }));
          }
        } catch (error) {
          console.error(`Failed to load conversation for match ${match.id}:`, error);
        } finally {
          setChatLoading((prev) => ({ ...prev, [match.id]: false }));
        }
      }
    };
 
    loadConversations();
  }, [data?.getMe?.id, data?.getMe?.matchIds, fetchChat, setConversations, setChatLoading]);
};
 
 
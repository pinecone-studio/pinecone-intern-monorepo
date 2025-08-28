import { useCallback } from 'react';
import { useGetChatWithUserLazyQuery, useGetMeQuery, useMarkMessagesAsSeenMutation } from '@/generated';
import { Message } from 'types/chat';
import { socket } from 'utils/socket';

export const useMarkMessagesAsSeen = (selectedUser: { id: string } | null, setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>) => {
  const [markMessagesAsSeenMutation] = useMarkMessagesAsSeenMutation();
  const { data } = useGetMeQuery();
  const [fetchChat] = useGetChatWithUserLazyQuery();

  const markMessagesAsSeen = useCallback(async () => {
    if (!selectedUser || !data?.getMe?.id) return;
    const matchId = selectedUser.id;
    const userId = data.getMe.id;
    const participantId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;
    if (!participantId) return;

    try {
      await markMessagesAsSeenMutation({ variables: { matchId, userId } });
      const { data: freshChatData } = await fetchChat({ variables: { userId, participantId } });

      if (freshChatData?.getChatWithUser?.messages) {
        const serverMessages: Message[] = freshChatData.getChatWithUser.messages.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.senderId === userId ? 'me' : 'them',
          timestamp: new Date(msg.createdAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
          seen: msg.seen,
        }));

        setConversations((prev) => {
          const existing = prev[matchId] || [];
          const mergedMessagesMap = new Map();
          for (const msg of existing) {
            mergedMessagesMap.set(msg.id, msg);
          }

          for (const msg of serverMessages) {
            mergedMessagesMap.set(msg.id, msg);
          }

          const mergedMessages = Array.from(mergedMessagesMap.values()).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

          return { ...prev, [matchId]: mergedMessages };
        });
      }

      socket.emit('seen messages', { matchId, userId });
    } catch (error) {
      console.error('Failed to mark messages as seen:', error);
    }
  }, [selectedUser, data, markMessagesAsSeenMutation, setConversations, fetchChat]);

  return markMessagesAsSeen;
};

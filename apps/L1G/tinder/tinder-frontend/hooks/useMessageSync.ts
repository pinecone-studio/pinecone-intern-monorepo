/* eslint-disable no-unused-vars */
'use client';
import { useCallback } from 'react';
import { useGetChatWithUserLazyQuery } from '@/generated';
import { Message } from 'types/chat';
import { mergeMessages } from 'utils/message-utils';

export const useMessageSync = () => {
  const [fetchChat] = useGetChatWithUserLazyQuery();

  const syncMessagesWithServer = useCallback(
    async (matchId: string, userId: string, participantId: string, currentMessages: Message[], updateMessages: (matchId: string, messages: Message[]) => void) => {
      try {
        const { data: freshChatData } = await fetchChat({
          variables: { userId, participantId },
          fetchPolicy: 'network-only',
        });

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
            delivered: true,
            sending: false,
            failed: false,
            retrying: false,
          }));

          const mergedMessages = mergeMessages(currentMessages, serverMessages);
          updateMessages(matchId, mergedMessages);
        }
      } catch (error) {
        console.warn('Failed to sync messages with server:', error);
      }
    },
    [fetchChat]
  );

  return { syncMessagesWithServer };
};

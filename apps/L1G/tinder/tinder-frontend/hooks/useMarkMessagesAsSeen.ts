/* eslint-disable max-lines */
'use client';

import { useCallback, useRef } from 'react';
import { useGetChatWithUserLazyQuery, useGetMeQuery, useMarkMessagesAsSeenMutation } from '@/generated';
import { Message } from 'types/chat';
import { socket } from 'utils/socket';

export const useMarkMessagesAsSeen = (
  selectedUser: { id: string } | null,
  conversations: Record<string, Message[]>,
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>
) => {
  const [markMessagesAsSeenMutation] = useMarkMessagesAsSeenMutation();
  const { data } = useGetMeQuery();
  const [fetchChat] = useGetChatWithUserLazyQuery();
  const processingRef = useRef(false);
  const lastSeenTimestampRef = useRef<number>(0);
  // eslint-disable-next-line complexity
  const markMessagesAsSeen = useCallback(async () => {
    if (!selectedUser || !data?.getMe?.id || processingRef.current) return;

    const matchId = selectedUser.id;
    const userId = data.getMe.id;
    const participantId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;

    if (!participantId) return;

    // Prevent multiple simultaneous calls
    processingRef.current = true;

    // Throttle seen updates (max once per 2 seconds)
    const now = Date.now();
    if (now - lastSeenTimestampRef.current < 2000) {
      processingRef.current = false;
      return;
    }
    lastSeenTimestampRef.current = now;

    try {
      // Get current unread messages from local state
      const messagesForMatch = conversations[matchId] || [];
      const unreadMessages = messagesForMatch.filter((msg: Message) => msg.sender === 'them' && !msg.seen);

      if (unreadMessages.length === 0) {
        processingRef.current = false;
        return;
      }

      // Mark as seen in backend
      await markMessagesAsSeenMutation({
        variables: { matchId, userId },
      });

      // Update local state immediately for better UX
      const messageIds = unreadMessages.map((msg: Message) => msg.id);
      setConversations((prev) => ({
        ...prev,
        [matchId]: (prev[matchId] || []).map((msg) => (messageIds.includes(msg.id) ? { ...msg, seen: true } : msg)),
      }));

      // Emit seen event to socket with smooth delay
      setTimeout(() => {
        socket.emit('messages_seen', {
          matchId,
          userId,
          messageIds,
        });
      }, 300);

      // Fetch fresh data in background to sync with server
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

          // eslint-disable-next-line complexity
          setConversations((prev) => {
            const currentLocal = prev[matchId] || [];
            const mergedMessagesMap = new Map();

            // Add server messages first
            for (const msg of serverMessages) {
              mergedMessagesMap.set(msg.id, msg);
            }

            // Overlay local messages (including optimistic ones)
            for (const msg of currentLocal) {
              if (typeof msg.id === 'string' && msg.id.startsWith('temp_')) {
                // Keep optimistic messages
                mergedMessagesMap.set(msg.id, msg);
              } else if (mergedMessagesMap.has(msg.id)) {
                // Merge local state with server data
                const serverMsg = mergedMessagesMap.get(msg.id);
                mergedMessagesMap.set(msg.id, {
                  ...serverMsg,
                  ...msg, // Local state takes precedence for UI states
                  seen: serverMsg.seen, // But server takes precedence for seen status
                });
              } else {
                mergedMessagesMap.set(msg.id, msg);
              }
            }

            const mergedMessages = Array.from(mergedMessagesMap.values()).sort((a, b) => {
              const timeA = new Date(`2000-01-01 ${a.timestamp}`).getTime();
              const timeB = new Date(`2000-01-01 ${b.timestamp}`).getTime();
              return timeA - timeB;
            });

            return { ...prev, [matchId]: mergedMessages };
          });
        }
      } catch (syncError) {
        console.warn('Failed to sync messages with server:', syncError);
        // Don't throw here, the seen action already succeeded
      }
    } catch (error) {
      console.error('Failed to mark messages as seen:', error);

      // Revert optimistic update on error
      setConversations((prev) => ({
        ...prev,
        [matchId]: (prev[matchId] || []).map((msg) => (msg.sender === 'them' ? { ...msg, seen: false } : msg)),
      }));
    } finally {
      processingRef.current = false;
    }
  }, [selectedUser, data, markMessagesAsSeenMutation, setConversations, fetchChat]);

  // Auto-mark messages as seen when they come in (if user is active)
  const autoMarkNewMessagesAsSeen = useCallback(
    (matchId: string) => {
      if (selectedUser?.id === matchId && document.hasFocus() && !document.hidden) {
        // Small delay to ensure message is rendered first
        setTimeout(() => {
          markMessagesAsSeen();
        }, 500);
      }
    },
    [selectedUser, markMessagesAsSeen]
  );

  return { markMessagesAsSeen, autoMarkNewMessagesAsSeen };
};
 
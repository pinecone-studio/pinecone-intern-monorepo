import { useCallback, useState } from 'react';
import { socket } from 'utils/socket';
import { debounce } from 'lodash';
import { useSendMessageMutation } from '@/generated';
import { ChatUser, Message } from 'types/chat';

const debouncedRefetch = debounce((refetchFn: () => void) => {
  refetchFn();
}, 500);

interface UseMessageSendingProps {
  selectedUser: ChatUser | null;
  data: any;
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setChattedUsers: React.Dispatch<React.SetStateAction<Set<string>>>;
  // eslint-disable-next-line no-unused-vars
  moveUserToBottom: (_user: ChatUser) => void;
  setSocketError: React.Dispatch<React.SetStateAction<string | null>>;
  refetch: () => void;
}

export const useMessageSending = ({ selectedUser, data, setConversations, setChattedUsers, moveUserToBottom, setSocketError, refetch }: UseMessageSendingProps) => {
  const [sendMessageMutation] = useSendMessageMutation();
  const [sending, setSending] = useState(false);

  const generateTimestamp = useCallback(
    (): string =>
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    []
  );
  const handleSend = useCallback(
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line complexity
    async (inputValue: string, setInputValue: (_value: string) => void) => {
      const content = inputValue.trim();

      if (sending || !content || !selectedUser || !data?.getMe?.id) return;

      setSending(true);
      setInputValue('');
      const matchId = selectedUser.id;
      const senderId = data.getMe.id;
      const receiverId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;

      if (!receiverId) {
        setSending(false);
        return;
      }

      const tempId = Date.now();
      const optimisticMessage: Message = {
        id: tempId,
        text: content,
        sender: 'me',
        timestamp: generateTimestamp(),
      };

      setConversations((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), optimisticMessage],
      }));

      setInputValue('');
      setChattedUsers((prev) => new Set(prev).add(selectedUser.id));
      moveUserToBottom(selectedUser);
      debouncedRefetch(refetch);

      try {
        const result = await sendMessageMutation({
          variables: { senderId, receiverId, matchId, content },
        });

        const createdMessageId = result.data?.sendMessage?.id;
        if (createdMessageId) {
          setConversations((prev) => ({
            ...prev,
            [selectedUser.id]: prev[selectedUser.id].map((msg) => (msg.id === tempId ? { ...msg, id: createdMessageId } : msg)),
          }));
        }
      } catch (err) {
        console.error('Send failed:', err);
        setConversations((prev) => ({
          ...prev,
          [selectedUser.id]: prev[selectedUser.id].filter((msg) => msg.id !== tempId),
        }));
        setSocketError('Failed to send message. Please try again.');
      } finally {
        setSending(false);
      }

      try {
        socket.emit('chat message', { matchId, content, senderId, receiverId, id: undefined });
      } catch (err) {
        console.error('Socket emit failed:', err);
        setSocketError('Message saved, but failed to notify recipient.');
      }
    },
    [sending, selectedUser, data, sendMessageMutation, setConversations, setChattedUsers, moveUserToBottom, setSocketError, refetch, generateTimestamp]
  );

  return { handleSend, sending };
};

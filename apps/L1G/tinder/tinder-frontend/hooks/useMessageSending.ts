'use client';

import { useCallback, useState, useRef } from 'react';
import { socket } from 'utils/socket';
import { useSendMessageMutation } from '@/generated';
import { ChatUser, Message } from 'types/chat';

interface UseMessageSendingProps {
  selectedUser: ChatUser | null;
  data: any;
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
  setChattedUsers: React.Dispatch<React.SetStateAction<Set<string>>>;
  moveUserToBottom: (user: ChatUser) => void;
  setSocketError: React.Dispatch<React.SetStateAction<string | null>>;
  refetch: () => void;
}

export const useMessageSending = ({ selectedUser, data, setConversations, setChattedUsers, moveUserToBottom, setSocketError, refetch }: UseMessageSendingProps) => {
  const [sendMessageMutation] = useSendMessageMutation();
  const [sending, setSending] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const isTyping = useRef(false);
  const retryAttempts = useRef<Map<string, number>>(new Map());

  const generateTimestamp = useCallback(
    (): string =>
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    []
  );

  // Enhanced typing indicator handling
  const handleTyping = useCallback(
    (isUserTyping: boolean, matchId?: string) => {
      if (!selectedUser || !data?.getMe?.id) return;

      const currentMatchId = matchId || selectedUser.id;
      const userId = data.getMe.id;

      // Clear existing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
      }

      if (isUserTyping && !isTyping.current) {
        // Start typing
        isTyping.current = true;
        socket.emit('typing_start', { matchId: currentMatchId, userId });

        // Auto-stop typing after 3 seconds
        const timeout = setTimeout(() => {
          if (isTyping.current) {
            isTyping.current = false;
            socket.emit('typing_stop', { matchId: currentMatchId, userId });
          }
        }, 3000);
        setTypingTimeout(timeout);
      } else if (!isUserTyping && isTyping.current) {
        // Stop typing
        isTyping.current = false;
        socket.emit('typing_stop', { matchId: currentMatchId, userId });
      }
    },
    [selectedUser, data, typingTimeout]
  );

  // Retry mechanism for failed messages
  const retryMessage = useCallback(
    async (tempId: string | number, content: string, matchId: string, senderId: string, receiverId: string) => {
      const retryKey = `${tempId}`;
      const attempts = retryAttempts.current.get(retryKey) || 0;

      if (attempts >= 3) {
        // Max retries reached, mark as failed
        setConversations((prev) => ({
          ...prev,
          [matchId]: prev[matchId].map((msg) => (msg.id === tempId ? { ...msg, failed: true, retrying: false } : msg)),
        }));
        return false;
      }

      try {
        retryAttempts.current.set(retryKey, attempts + 1);

        // Update message status to retrying
        setConversations((prev) => ({
          ...prev,
          [matchId]: prev[matchId].map((msg) => (msg.id === tempId ? { ...msg, retrying: true, failed: false } : msg)),
        }));

        const result = await sendMessageMutation({
          variables: { senderId, receiverId, matchId, content },
        });

        const createdMessageId = result.data?.sendMessage?.id;
        if (createdMessageId) {
          // Success - update message with real ID
          setConversations((prev) => ({
            ...prev,
            [matchId]: prev[matchId].map((msg) =>
              msg.id === tempId
                ? {
                    ...msg,
                    id: createdMessageId,
                    retrying: false,
                    failed: false,
                    delivered: true,
                  }
                : msg
            ),
          }));

          // Send via socket with real ID
          socket.emit('chat_message', {
            matchId,
            content,
            senderId,
            receiverId,
            messageId: createdMessageId,
            tempId,
            timestamp: new Date().toISOString(),
          });

          retryAttempts.current.delete(retryKey);
          return true;
        }
      } catch (error) {
        console.error(`Retry attempt ${attempts + 1} failed:`, error);
      }

      return false;
    },
    [sendMessageMutation, setConversations]
  );

  const handleSend = useCallback(
    async (inputValue: string, setInputValue: (value: string) => void) => {
      const content = inputValue.trim();
      if (sending || !content || !selectedUser || !data?.getMe?.id) return;

      setSending(true);

      const matchId = selectedUser.id;
      const senderId = data.getMe.id;
      const receiverId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;

      if (!receiverId) {
        setSending(false);
        setSocketError('Recipient not found. Please try again.');
        return;
      }

      // Stop typing indicator
      handleTyping(false, matchId);

      const tempId = `temp_${Date.now()}_${Math.random()}`;
      const timestamp = generateTimestamp();

      // Create optimistic message with enhanced status
      const optimisticMessage: Message = {
        id: tempId,
        text: content,
        sender: 'me',
        timestamp,
        seen: false,
        delivered: false,
        sending: true,
        failed: false,
        retrying: false,
      };

      // Add optimistic message to conversation
      setConversations((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), optimisticMessage],
      }));

      // Clear input and update UI state
      setInputValue('');
      setChattedUsers((prev) => new Set(prev).add(selectedUser.id));
      moveUserToBottom(selectedUser);

      try {
        // Removed the immediate socket.emit here to prevent duplicates

        // Send to backend
        const result = await sendMessageMutation({
          variables: { senderId, receiverId, matchId, content },
        });

        const createdMessageId = result.data?.sendMessage?.id;

        if (createdMessageId) {
          // Success - update optimistic message with real data
          setConversations((prev) => ({
            ...prev,
            [selectedUser.id]: prev[selectedUser.id].map((msg) =>
              msg.id === tempId
                ? {
                    ...msg,
                    id: createdMessageId,
                    sending: false,
                    delivered: true,
                    failed: false,
                  }
                : msg
            ),
          }));

          // Emit socket message with real ID after confirmation
          socket.emit('chat_message', {
            matchId,
            content,
            senderId,
            receiverId,
            messageId: createdMessageId,
            tempId,
            timestamp: new Date().toISOString(),
          });

          setSocketError(null);
        } else {
          throw new Error('No message ID returned');
        }
      } catch (error) {
        console.error('Send message failed:', error);

        // Mark message as failed but keep it in conversation
        setConversations((prev) => ({
          ...prev,
          [selectedUser.id]: prev[selectedUser.id].map((msg) =>
            msg.id === tempId
              ? {
                  ...msg,
                  sending: false,
                  failed: true,
                  delivered: false,
                }
              : msg
          ),
        }));

        setSocketError('Message failed to send. Tap to retry.');
      } finally {
        setSending(false);
      }
    },
    [sending, selectedUser, data, sendMessageMutation, setConversations, setChattedUsers, moveUserToBottom, setSocketError, generateTimestamp, handleTyping]
  );

  // Retry failed message
  const retryFailedMessage = useCallback(
    async (messageId: string | number) => {
      if (!selectedUser || !data?.getMe?.id) return;

      const matchId = selectedUser.id;
      const senderId = data.getMe.id;
      const receiverId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;

      if (!receiverId) return;

      // Find the failed message
      setConversations((prev) => {
        const messages = prev[matchId] || [];
        const failedMessage = messages.find((msg) => msg.id === messageId);

        if (!failedMessage) return prev;

        // Retry the message
        retryMessage(messageId, failedMessage.text, matchId, senderId, receiverId);

        return prev;
      });
    },
    [selectedUser, data, retryMessage, setConversations]
  );

  // Input change handler with typing indicator
  const handleInputChange = useCallback(
    (value: string) => {
      // Trigger typing indicator when user starts typing
      if (value.trim().length > 0) {
        handleTyping(true);
      } else {
        handleTyping(false);
      }
    },
    [handleTyping]
  );

  return {
    handleSend,
    sending,
    retryFailedMessage,
    handleInputChange,
    handleTyping,
  };
};

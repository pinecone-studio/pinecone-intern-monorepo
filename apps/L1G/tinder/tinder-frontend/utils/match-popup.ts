/* eslint-disable react/function-component-definition */
/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-secrets/no-secrets */
/* eslint-disable no-unused-vars */
import { Message } from 'types/chat';
import { Socket } from 'socket.io-client';

// Utility functions
export const generateTimestamp = (): string =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

export const handleInputChangeLocal = (setInputValue: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
  setInputValue(value);
};

export const handleKeyPress = (handleSendMessage: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};

export const createOptimisticMessage = (content: string, generateTimestamp: () => string): Message => {
  const tempId = `temp_${Date.now()}_${Math.random()}`;
  const timestamp = generateTimestamp();

  return {
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
};

export const updateConversationsWithMessage = (setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>, selectedUserId: string, message: Message) => {
  setConversations((prev) => ({
    ...prev,
    [selectedUserId]: [...(prev[selectedUserId] || []), message],
  }));
};

export const updateChattedUsers = (setChattedUsers: React.Dispatch<React.SetStateAction<Set<string>>>, userId: string) => {
  setChattedUsers((prev) => new Set(prev).add(userId));
};

export const updateMessageStatus = (setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>, selectedUserId: string, tempId: string, createdMessageId: string) => {
  setConversations((prev) => ({
    ...prev,
    [selectedUserId]:
      prev[selectedUserId]?.map((msg) =>
        msg.id === tempId
          ? {
              ...msg,
              id: createdMessageId,
              sending: false,
              delivered: true,
              failed: false,
            }
          : msg
      ) || [],
  }));
};

export const markMessageAsFailed = (setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>, selectedUserId: string, tempId: string) => {
  setConversations((prev) => ({
    ...prev,
    [selectedUserId]:
      prev[selectedUserId]?.map((msg) =>
        msg.id === tempId
          ? {
              ...msg,
              sending: false,
              failed: true,
              delivered: false,
            }
          : msg
      ) || [],
  }));
};

export const storeMessageInLocalStorage = (matchId: string, message: Message) => {
  const storageKey = `pending_message_${matchId}`;
  try {
    localStorage.setItem(storageKey, JSON.stringify(message));
    console.log('Message stored in localStorage for cross-page persistence');
  } catch (e) {
    console.warn('Could not store message in localStorage:', e);
  }
};

// Main handler function
export const handleSendMessage = async ({
  inputValue,
  sending,
  setSending,
  socketError,
  setSocketError,
  sendMessageMutation,
  currentUser,
  selectedUser,
  data,
  setConversations,
  setChattedUsers,
  onClose,
  refetch,
  setInputValue,
  socket,
  createOptimisticMessage,
  generateTimestamp,
  updateConversationsWithMessage,
  updateChattedUsers,
  updateMessageStatus,
  markMessageAsFailed,
  storeMessageInLocalStorage,
}: {
  inputValue: string;
  sending: boolean;
  setSending: React.Dispatch<React.SetStateAction<boolean>>;
  socketError: string | null;
  setSocketError: React.Dispatch<React.SetStateAction<string | null>>;
  sendMessageMutation: any;
  currentUser: any;
  selectedUser: any;
  data: any;
  setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>> | undefined;
  setChattedUsers: React.Dispatch<React.SetStateAction<Set<string>>> | undefined;
  onClose: () => void;
  refetch: (() => void) | undefined;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket;
  createOptimisticMessage: (content: string, generateTimestamp: () => string) => Message;
  generateTimestamp: () => string;
  updateConversationsWithMessage: (setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>, selectedUserId: string, message: Message) => void;
  updateChattedUsers: (setChattedUsers: React.Dispatch<React.SetStateAction<Set<string>>>, userId: string) => void;
  updateMessageStatus: (setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>, selectedUserId: string, tempId: string, createdMessageId: string) => void;
  markMessageAsFailed: (setConversations: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>, selectedUserId: string, tempId: string) => void;
  storeMessageInLocalStorage: (matchId: string, message: Message) => void;
}) => {
  const content = inputValue.trim();
  if (sending || !content || !selectedUser || !data?.getMe?.id) return;
  setSending(true);
  setSocketError(null);
  const matchData = currentUser?.matchIds?.find((m: any) => m?.matchedUser?.id === selectedUser.id);
  const matchId = matchData?.id;
  const senderId = data.getMe.id;
  const receiverId = matchData?.matchedUser?.id;
  if (!receiverId) {
    console.error('Receiver ID not found for match:', matchId);
    setSending(false);
    setSocketError('Recipient not found. Please try again.');
    return;
  }
  if (!matchId) {
    console.error('Match ID not found for selected user:', selectedUser.id);
    setSending(false);
    setSocketError('Match information not found. Please try again.');
    return;
  }
  const optimisticMessage = createOptimisticMessage(content, generateTimestamp);
  if (setConversations) {
    updateConversationsWithMessage(setConversations, selectedUser.id, optimisticMessage);
  }
  if (setChattedUsers) {
    updateChattedUsers(setChattedUsers, selectedUser.id);
  }
  try {
    console.log('Sending message with data:', { senderId, receiverId, matchId, content });
    const result = await sendMessageMutation({
      variables: { senderId, receiverId, matchId, content },
    });
    const createdMessageId = result.data?.sendMessage?.id;
    console.log('Backend response:', { createdMessageId });
    if (createdMessageId) {
      if (setConversations) {
        updateMessageStatus(setConversations, selectedUser.id, optimisticMessage.id, createdMessageId);
      }
      if (!socket.connected) {
        console.warn('Socket not connected, attempting to reconnect...');
        socket.connect();
      }
      socket.emit('chat_message', {
        matchId,
        content,
        senderId,
        receiverId,
        messageId: createdMessageId,
        tempId: optimisticMessage.id,
        timestamp: new Date().toISOString(),
      });
      const pendingMessage = {
        ...optimisticMessage,
        id: createdMessageId,
        sending: false,
        delivered: true,
      };
      storeMessageInLocalStorage(matchId, pendingMessage);
      setInputValue('');
      console.log('Message sent successfully from MatchPopup');
      setTimeout(() => onClose(), 1000);
      if (refetch) {
        refetch();
      }
    } else {
      throw new Error('No message ID returned from backend');
    }
  } catch (error) {
    console.error('Send message failed from MatchPopup:', error);
    if (setConversations) {
      markMessageAsFailed(setConversations, selectedUser.id, optimisticMessage.id);
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    setSocketError(`Failed to send message: ${errorMessage}`);
  } finally {
    setSending(false);
  }
};

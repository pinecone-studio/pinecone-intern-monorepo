/* eslint-disable max-lines */
'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import ChatPerson from '@/components/ChatPerson';
import ChatWindow from '@/components/ChatWindow';
import Matches from '@/components/Matches';
import { useGetChatWithUserLazyQuery, useGetMeQuery, useMarkMessagesAsSeenMutation, useSendMessageMutation } from '@/generated';
import Loading from './Loading';
import { socket } from 'utils/socket';
import { debounce } from 'lodash';

type Message = {
  id: any;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  seen?: boolean;
};

export type ChatUser = {
  id: string;
  name: string;
  images: string[];
  dateOfBirth: string;
  profession: string;
  age: number;
  startedConversation: boolean;
};

const generateTimestamp = (): string =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

const debouncedRefetch = debounce((refetchFn: () => void) => {
  refetchFn();
}, 500);

const ChatPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeQuery();
  const [sendMessageMutation] = useSendMessageMutation();
  const [fetchChat, { data: chatData }] = useGetChatWithUserLazyQuery();
  const [markMessagesAsSeenMutation] = useMarkMessagesAsSeenMutation();

  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [topRowUsers, setTopRowUsers] = useState<ChatUser[]>([]);
  const [bottomUsers, setBottomUsers] = useState<ChatUser[]>([]);
  const [chattedUsers, setChattedUsers] = useState<Set<string>>(new Set());
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [socketError, setSocketError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!chatData?.getChatWithUser || !selectedUser || !data?.getMe?.id) return;

    const messages: Message[] = chatData.getChatWithUser.messages.map((msg) => ({
      id: msg.id,
      text: msg.content,
      sender: msg.senderId === data.getMe.id ? 'me' : 'them',
      timestamp: new Date(msg.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      seen: msg.seen,
    }));

    setConversations((prev) => ({
      ...prev,
      [selectedUser.id]: messages,
    }));
  }, [chatData, selectedUser, data]);
  const markMessagesAsSeen = useCallback(async () => {
    if (!selectedUser || !data?.getMe?.id) return;

    const matchId = selectedUser.id;
    const userId = data.getMe.id;

    try {
      await markMessagesAsSeenMutation({
        variables: {
          matchId,
          userId,
        },
      });
      socket.emit('seen messages', { matchId, userId });
      setConversations((prev) => {
        const messagesForMatch = prev[matchId] || [];
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
  }, [selectedUser, data, markMessagesAsSeenMutation]);

  useEffect(() => {
    if (!selectedUser || !data?.getMe?.id) return;

    const matchId = selectedUser.id;
    const userId = data.getMe.id;
    const participantId = data.getMe.matchIds?.find((m) => m?.id === matchId)?.matchedUser?.id;
    if (!participantId) return;
    fetchChat({ variables: { userId, participantId } });

    try {
      socket.emit('join room', matchId);
    } catch (err) {
      console.error('Failed to join room:', err);
      setSocketError('Failed to connect to chat. Please try again.');
    }
    const timeout = setTimeout(() => {
      markMessagesAsSeen();
    }, 500);
    const handler = (msg: { matchId: string; content: string; senderId: string; receiverId: string }) => {
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

    socket.on('chat message', handler);
    const seenUpdateHandler = ({ matchId: updatedMatchId, userId: seenUserId }: { matchId: string; userId: string }) => {
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
    socket.on('messages seen update', seenUpdateHandler);

    return () => {
      try {
        socket.emit('leave room', matchId);
      } catch (err) {
        console.error('Failed to leave room:', err);
      }
      socket.off('chat message', handler);
      socket.off('messages seen update', seenUpdateHandler);
      clearTimeout(timeout);
    };
  }, [selectedUser, conversations, data, fetchChat, markMessagesAsSeen]);

  useEffect(() => {
    const matchIds = data?.getMe?.matchIds ?? [];
    const allMatches: ChatUser[] = matchIds
      .filter((match) => !!match && !!match.matchedUser)
      .map((match) => {
        const user = match!.matchedUser;

        const birthDate = user.dateOfBirth ? new Date(user.dateOfBirth) : null;
        const age = birthDate ? new Date().getFullYear() - birthDate.getFullYear() : 0;

        return {
          id: match!.id,
          name: user.name || 'Unknown',
          images: user.images && user.images.length > 0 ? user.images : ['/default-avatar.jpg'],
          dateOfBirth: user.dateOfBirth || '',
          profession: user.profession || '',
          age,
          startedConversation: match!.startedConversation,
        };
      });

    const usersNotStartedConversation = allMatches.filter((user) => !user.startedConversation);
    const usersStartedConversation = allMatches.filter((user) => user.startedConversation);

    setTopRowUsers(usersNotStartedConversation.slice(0, 7));
    setBottomUsers(usersStartedConversation);

    setSelectedUser((prevSelected) => {
      if (prevSelected && allMatches.find((u) => u.id === prevSelected.id)) return prevSelected;
      return usersStartedConversation[0] || usersNotStartedConversation[0] || null;
    });

    const chattedUserIds = new Set(usersStartedConversation.map((user) => user.id));
    setChattedUsers(chattedUserIds);
  }, [data]);

  const messages = useMemo(() => {
    if (!selectedUser) return [];
    return conversations[selectedUser.id] || [];
  }, [selectedUser, conversations]);

  const handleUserSelect = useCallback((user: ChatUser) => {
    setSelectedUser(user);
    setSocketError(null);
  }, []);

  const moveUserToBottom = useCallback((user: ChatUser) => {
    setTopRowUsers((prev) => prev.filter((u) => u.id !== user.id));
    setBottomUsers((prev) => (prev.some((u) => u.id === user.id) ? prev : [user, ...prev]));
  }, []);
  /* eslint-disable-next-line complexity */
  const handleSend = useCallback(async () => {
    if (sending || !inputValue.trim() || !selectedUser || !data?.getMe?.id) return;
    setSending(true);

    const content = inputValue.trim();
    const matchId = selectedUser.id;
    const senderId = data.getMe.id;
    const receiverId = data.getMe.matchIds?.find((m) => m?.id === matchId)?.matchedUser?.id;

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
      socket.emit('chat message', {
        matchId,
        content,
        senderId,
        receiverId,
        id: undefined,
      });
    } catch (err) {
      console.error('Socket emit failed:', err);
      setSocketError('Message saved, but failed to notify recipient.');
    }
  }, [inputValue, selectedUser, data, sendMessageMutation, sending, moveUserToBottom, setChattedUsers, debouncedRefetch, refetch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const isOnlyEnter = e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey;

      if (isOnlyEnter) {
        e.preventDefault();
        if (!sending) {
          handleSend();
        }
      }
    },
    [handleSend, sending]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);
  const lastSeenMessageId = useMemo(() => {
    // find last message sent by 'me' that has seen === true
    const seenMessages = messages.filter((m) => m.sender === 'me' && m.seen);
    if (seenMessages.length === 0) return null;
    return seenMessages[seenMessages.length - 1].id;
  }, [messages]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading chat: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {socketError && <div className="error-message text-red-500 p-2 text-center">{socketError}</div>}
      <Matches topRowUsers={topRowUsers} selectedUser={selectedUser} onUserSelect={handleUserSelect} />
      <div className="flex justify-center">
        <ChatPerson selectedUser={selectedUser} onUserSelect={handleUserSelect} bottomUsers={bottomUsers} chattedUsers={chattedUsers} />
        <ChatWindow
          lastSeenMessageId={lastSeenMessageId}
          sending={sending}
          selectedUser={selectedUser}
          messages={messages}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatPage;

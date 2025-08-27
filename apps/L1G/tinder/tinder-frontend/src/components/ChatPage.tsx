'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import ChatPerson from '@/components/ChatPerson';
import ChatWindow from '@/components/ChatWindow';
import Matches from '@/components/Matches';
import { useGetMeQuery, useSendMessageMutation } from '@/generated';
import Loading from './Loading';
import { socket } from 'utils/socket';
import { debounce } from 'lodash';

type Message = {
  id: any;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
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
const getInitialTopRowUsers = (matches: ChatUser[]) => matches.slice(0, 7);
const getInitialBottomUsers = (matches: ChatUser[]) => matches.slice(7);

const ChatPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeQuery();
  console.log(data, 'data');
  const [sendMessageMutation] = useSendMessageMutation();

  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [topRowUsers, setTopRowUsers] = useState<ChatUser[]>([]);
  const [bottomUsers, setBottomUsers] = useState<ChatUser[]>([]);
  const [chattedUsers, setChattedUsers] = useState<Set<string>>(new Set());
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (!selectedUser) return;

    const matchId = selectedUser.id;

    // Join the match room
    socket.emit('join room', matchId);
    console.log(`Joined room: ${matchId}`);

    // Listen for messages
    const handler = (msg: { matchId: string; message: string; senderId: string; receiverId: string }) => {
      if (msg.matchId === matchId) {
        setConversations((prev) => ({
          ...prev,
          [matchId]: [
            ...(prev[matchId] || []),
            {
              id: Date.now(),
              text: msg.message,
              sender: 'them',
              timestamp: generateTimestamp(),
            },
          ],
        }));
      }
    };

    socket.on('chat message', handler);

    return () => {
      socket.emit('leave room', matchId); // <-- Optional, your server can handle this
      socket.off('chat message', handler); // <-- Very important to prevent memory leaks
    };
  }, [selectedUser]);

  useEffect(() => {
    const matchIds = data?.getMe?.matchIds ?? [];

    const newMatches: ChatUser[] = matchIds
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

    setSelectedUser((prevSelected) => {
      if (prevSelected && newMatches.find((u) => u.id === prevSelected.id)) return prevSelected;
      return newMatches[0] || null;
    });

    setTopRowUsers(getInitialTopRowUsers(newMatches));
    setBottomUsers(getInitialBottomUsers(newMatches));

    const chattedUserIds = new Set(newMatches.filter((user) => user.startedConversation).map((user) => user.id));
    setChattedUsers(chattedUserIds);
  }, [data]);

  const messages = useMemo(() => {
    if (!selectedUser) return [];
    return conversations[selectedUser.id] || [];
  }, [selectedUser, conversations]);

  const handleUserSelect = useCallback((user: ChatUser) => {
    setSelectedUser(user);
  }, []);

  const moveUserToBottom = useCallback((user: ChatUser) => {
    setTopRowUsers((prev) => prev.filter((u) => u.id !== user.id));
    setBottomUsers((prev) => (prev.some((u) => u.id === user.id) ? prev : [user, ...prev]));
  }, []);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || !selectedUser || !data?.getMe?.id) return;

    const content = inputValue.trim();
    const matchId = selectedUser.id;
    const senderId = data.getMe.id;
    const receiverId = data.getMe.matchIds?.find((m) => m?.id === matchId)?.matchedUser?.id;

    if (!receiverId) return;

    try {
      // 1. Save message in DB
      const result = await sendMessageMutation({
        variables: { senderId, receiverId, matchId, content },
      });
      const createdMessageId = result.data?.sendMessage?.id;

      // 2. Emit to Socket.IO
      socket.emit('chat message', {
        matchId,
        message: content,
        senderId,
        receiverId,
        id: createdMessageId,
      });

      // 3. Add message to UI
      const newMessage: Message = {
        id: createdMessageId ?? Date.now(),
        text: content,
        sender: 'me',
        timestamp: generateTimestamp(),
      };

      setConversations((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
      }));

      setInputValue('');
      setChattedUsers((prev) => new Set(prev).add(selectedUser.id));
      moveUserToBottom(selectedUser);
      debouncedRefetch(refetch);
    } catch (err) {
      console.error('Send failed:', err);
    }
  }, [inputValue, selectedUser, data, sendMessageMutation]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading chat: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Matches topRowUsers={topRowUsers} selectedUser={selectedUser} onUserSelect={handleUserSelect} />
      <div className="flex justify-center">
        <ChatPerson selectedUser={selectedUser} onUserSelect={handleUserSelect} bottomUsers={bottomUsers} chattedUsers={chattedUsers} />
        <ChatWindow selectedUser={selectedUser} messages={messages} inputValue={inputValue} onInputChange={handleInputChange} onKeyDown={handleKeyDown} onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;

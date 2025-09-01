'use client';

import type React from 'react';

import { useState, useCallback, useMemo, useEffect } from 'react';
import ChatPerson from '@/components/ChatPerson';
import ChatWindow from '@/components/ChatWindow';
import Matches from '@/components/Matches';
import { useGetChatWithUserLazyQuery, useGetMeQuery } from '@/generated';
import Loading from './Loading';
import type { Message } from 'types/chat';
import { useMessageSending } from 'hooks/useMessageSending';
import { useSocketConnection } from 'hooks/useSocketConnection';
import { useUserManagement } from 'hooks/useUserManagement';
import { useMarkMessagesAsSeen } from 'hooks/useMarkMessagesAsSeen';

const ChatPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeQuery();
  const [fetchChat, { data: chatData }] = useGetChatWithUserLazyQuery();
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [socketError, setSocketError] = useState<string | null>(null);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  const { selectedUser, topRowUsers, bottomUsers, chattedUsers, handleUserSelect, moveUserToBottom, setChattedUsers } = useUserManagement(data);
  const messages = useMemo(() => {
    if (!selectedUser) return [];
    return conversations[selectedUser.id] || [];
  }, [selectedUser, conversations]);
  const markMessagesAsSeen = useMarkMessagesAsSeen(selectedUser, setConversations);

  useEffect(() => {
    if (!selectedUser) return;
    markMessagesAsSeen();
  }, [selectedUser, markMessagesAsSeen]);

  useEffect(() => {
    if (!selectedUser || messages.length === 0) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'them' && !lastMessage.seen) {
      markMessagesAsSeen();
    }
  }, [messages, selectedUser, markMessagesAsSeen]);

  useEffect(() => {
    if (!chatData?.getChatWithUser || !selectedUser || !data?.getMe?.id) return;

    const serverMessages: Message[] = chatData.getChatWithUser.messages.map((msg: any) => ({
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

    setConversations((prev) => {
      return {
        ...prev,
        [selectedUser.id]: serverMessages.sort((a, b) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }),
      };
    });
  }, [chatData, selectedUser, data]);

  useEffect(() => {
    if (!selectedUser || !data?.getMe?.id) return;
    const matchId = selectedUser.id;
    const userId = data.getMe.id;
    const participantId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;
    if (!participantId) return;
    fetchChat({ variables: { userId, participantId } });
  }, [selectedUser, data, fetchChat]);

  const lastSeenMessageId = useMemo(() => {
    const seenMessages = messages.filter((m) => m.sender === 'me' && m.seen);
    if (seenMessages.length === 0) return null;
    return seenMessages[seenMessages.length - 1].id;
  }, [messages]);

  const { handleSend, sending } = useMessageSending({
    selectedUser,
    data,
    setConversations,
    setChattedUsers,
    moveUserToBottom,
    setSocketError,
    refetch,
  });

  const handleUnmatched = () => {
    refetch();
  };

  useSocketConnection({
    selectedUser,
    data,
    setConversations,
    setSocketError,
    markMessagesAsSeen,
    handleUnmatched,
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        if (!sending) {
          handleSend(inputValue, setInputValue);
        }
      }
    },
    [handleSend, sending, inputValue]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSendClick = useCallback(() => {
    handleSend(inputValue, setInputValue);
  }, [handleSend, inputValue]);

  const handleUserSelectWithErrorReset = useCallback(
    (user: any) => {
      handleUserSelect(user);
      setSocketError(null);
      setShowChatOnMobile(true);
    },
    [handleUserSelect]
  );

  const handleBackToMessages = useCallback(() => {
    setShowChatOnMobile(false);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error loading chat: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-white">
      {socketError && <div className="error-message text-red-500 p-2 text-center bg-gray-800 border-b border-gray-100">{socketError}</div>}

      {/* Matches: show always on desktop, and on mobile only if NOT viewing ChatWindow */}
      {(!showChatOnMobile || window.innerWidth >= 768) && (
        <div className="w-full max-w-[980px]">
          <Matches topRowUsers={topRowUsers} selectedUser={selectedUser} onUserSelect={handleUserSelectWithErrorReset} />
        </div>
      )}

      <div className="flex w-full h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] max-w-[980px] mx-auto">
        {/* On mobile: show ChatPerson only if chat window NOT visible */}
        <div className={`${showChatOnMobile ? 'hidden' : 'flex'} md:flex w-full md:w-[350px]`}>
          <ChatPerson selectedUser={selectedUser} onUserSelect={handleUserSelectWithErrorReset} bottomUsers={bottomUsers} chattedUsers={chattedUsers} className="" />
        </div>

        {/* On mobile: show ChatWindow only if chat window visible */}
        <div className={`${showChatOnMobile ? 'flex' : 'hidden'} w-full md:flex md:flex-1`}>
          <ChatWindow
            onUnmatched={handleUnmatched}
            matchId={selectedUser?.id}
            lastSeenMessageId={lastSeenMessageId}
            sending={sending}
            selectedUser={selectedUser}
            messages={messages}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSend={handleSendClick}
            onBack={handleBackToMessages} // back button for mobile step 2
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

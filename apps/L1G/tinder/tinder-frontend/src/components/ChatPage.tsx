/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import ChatPerson from '@/components/ChatPerson';
import ChatWindow from '@/components/ChatWindow';
import Matches from '@/components/Matches';
import { useGetChatWithUserLazyQuery, useGetMeQuery } from '@/generated';
import Loading from './Loading';
import type { ChatUser, Message } from 'types/chat';
import { useMessageSending } from 'hooks/useMessageSending';
import { useSocketConnection } from 'hooks/useSocketConnection';
import { useUserManagement } from 'hooks/useUserManagement';
import { useMarkMessagesAsSeen } from 'hooks/useMarkMessagesAsSeen';
import { useMobileDetection } from 'hooks/useMobileDetection';
import { usePageVisibility } from 'hooks/usePageVisibility';
import { useConversationsLoader } from 'hooks/useConversationsLoader';
import { useSelectedChatLoader } from 'hooks/useSelectedChatLoader';
import { useNotifications } from 'hooks/useNotifications';
import NotificationToast from 'utils/notification-toast';
import { createMatchIdToUserStatusMap, getLastSeenMessageId, getUserStatusByMatchId, handleKeyDownForSending, shouldShowChatPersonOnMobile, shouldShowChatWindowOnMobile } from 'utils/status-utils';
import { useAutoMarkMessageAsSeen } from 'hooks/useAutoMarkMessageAsSeen';

// Import the new hook here
import { useChatHandlers } from 'hooks/useChatHandlers';

const ChatPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeQuery();
  const [fetchChat] = useGetChatWithUserLazyQuery();
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [_socketError, setSocketError] = useState<string | null>(null);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [chatLoading, setChatLoading] = useState<Record<string, boolean>>({});
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [userStatuses, setUserStatuses] = useState<
    Record<
      string,
      {
        status: 'online' | 'away' | 'offline';
        lastSeen: string;
      }
    >
  >({});

  const currentPageRef = useRef('chat');

  // Use custom hooks
  const isMobileDetected = useMobileDetection();
  const { notifications, handleNotification, dismissNotification, setNotifications } = useNotifications();

  // User management
  const { selectedUser, topRowUsers, bottomUsers, handleUserSelect, moveUserToBottom, setChattedUsers, addNewMatch, removeMatch } = useUserManagement(data, conversations);

  // Mark messages as seen
  const { markMessagesAsSeen } = useMarkMessagesAsSeen(selectedUser, conversations, setConversations);

  // Handle page visibility
  usePageVisibility(refetch, setNotifications);

  // Load conversations
  useConversationsLoader(data, fetchChat, setConversations, setChatLoading);

  // Load selected chat
  useSelectedChatLoader(selectedUser, data, fetchChat, setChatLoading);

  // Auto mark messages as seen
  useAutoMarkMessageAsSeen(selectedUser, showChatOnMobile, isMobileDetected, markMessagesAsSeen);

  // Cleanup conversations on unmount
  useEffect(() => {
    return () => {
      setConversations({});
    };
  }, []);

  // Memoized values using utility functions
  const messages = useMemo(() => {
    if (!selectedUser) return [];
    return conversations[selectedUser.id] || [];
  }, [selectedUser, conversations]);

  const lastSeenMessageId = useMemo(() => getLastSeenMessageId(messages), [messages]);

  const currentUserStatus = useMemo(() => getUserStatusByMatchId(selectedUser?.id, data?.getMe?.matchIds, userStatuses), [selectedUser?.id, data?.getMe?.matchIds, userStatuses]);

  const matchIdToUserStatusMap = useMemo(() => createMatchIdToUserStatusMap(data?.getMe?.matchIds, userStatuses), [data?.getMe?.matchIds, userStatuses]);

  // Event handlers
  const handleNewMatch = useCallback(
    (matchData: any) => {
      addNewMatch(matchData);
      refetch();
    },
    [addNewMatch, refetch]
  );

  const handleUnmatched = useCallback(
    (matchId: string) => {
      removeMatch(matchId);
      setConversations((prev) => {
        const newConversations = { ...prev };
        delete newConversations[matchId];
        return newConversations;
      });
      if (selectedUser?.id === matchId) {
        handleUserSelect(null);
      }
      refetch();
    },
    [removeMatch, selectedUser, handleUserSelect, refetch]
  );

  const { handleSend, sending, retryFailedMessage, handleInputChange } = useMessageSending({
    selectedUser,
    data,
    setConversations,
    setChattedUsers,
    moveUserToBottom: moveUserToBottom as (user: ChatUser) => void,
    setSocketError,
    refetch,
  });

  // Enhanced socket connection with all callbacks
  useSocketConnection({
    selectedUser,
    data,
    setConversations,
    setSocketError,
    markMessagesAsSeen,
    handleUnmatched,
    onNewMatch: handleNewMatch,
    onNotification: handleNotification,
    currentPage: currentPageRef.current,
    setUserStatuses,
    setTypingUsers,
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      handleKeyDownForSending(e, sending, inputValue, handleSend, setInputValue);
    },
    [handleSend, sending, inputValue]
  );

  const handleInputChangeWithTyping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      handleInputChange(value);
    },
    [handleInputChange]
  );

  // Use extracted handlers hook here
  const { handleSendClick, handleRetryMessage } = useChatHandlers({
    sending,
    inputValue,
    handleSend,
    setInputValue,
    retryFailedMessage,
  });

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

  if (loading) return <Loading msg="Please Wait..." />;
  if (error) return <div>Error loading chat: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center w-screen bg-white relative">
      {/* Notifications */}
      <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
        {notifications.map((notification) => (
          <NotificationToast key={notification.id} notification={notification} onClose={() => dismissNotification(notification.id)} />
        ))}
      </div>

      {/* Matches: show always on desktop, and on mobile only if NOT viewing ChatWindow */}
      {(!showChatOnMobile || !isMobileDetected) && (
        <div className="w-full max-w-[1330px]">
          <Matches topRowUsers={topRowUsers} selectedUser={selectedUser} onUserSelect={handleUserSelectWithErrorReset} />
        </div>
      )}

      <div className="flex w-full h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] max-w-[1330px]">
        {/* On mobile: show ChatPerson only if chat window NOT visible */}
        <div className={`${shouldShowChatPersonOnMobile(showChatOnMobile) ? 'flex' : 'hidden'} md:flex w-full md:w-[350px]`}>
          <ChatPerson selectedUser={selectedUser} onUserSelect={handleUserSelectWithErrorReset} bottomUsers={bottomUsers} userStatuses={matchIdToUserStatusMap} className="" />
        </div>

        {/* On mobile: show ChatWindow only if chat window visible */}
        <div className={`${shouldShowChatWindowOnMobile(showChatOnMobile) ? 'flex' : 'hidden'} w-full md:flex md:flex-1`}>
          <ChatWindow
            loading={selectedUser ? chatLoading[selectedUser.id] || false : false}
            onUnmatched={() => handleUnmatched(selectedUser!.id)}
            matchId={selectedUser?.id}
            lastSeenMessageId={lastSeenMessageId}
            sending={sending}
            selectedUser={selectedUser}
            messages={messages}
            inputValue={inputValue}
            onInputChange={handleInputChangeWithTyping}
            onKeyDown={handleKeyDown}
            onSend={handleSendClick}
            onBack={handleBackToMessages}
            onRetryMessage={handleRetryMessage}
            typingUsers={typingUsers}
            userStatus={currentUserStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

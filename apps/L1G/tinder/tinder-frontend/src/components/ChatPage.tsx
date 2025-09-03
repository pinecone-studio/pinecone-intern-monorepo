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
import { useAutoMarkMessagesAsSeen } from 'hooks/useAutoMarkMessageAsSeen';

interface NotificationProps {
  notification: {
    type: string;
    title: string;
    message: string;
    timestamp: string;
  };
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return '💕';
      case 'message':
        return '💬';
      case 'unmatch':
        return '💔';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'match':
        return 'from-pink-500 to-red-500';
      case 'message':
        return 'from-blue-500 to-purple-500';
      case 'unmatch':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-green-500 to-blue-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`bg-gradient-to-r ${getNotificationColor(notification.type)} text-white p-4 rounded-lg shadow-lg max-w-sm`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
            <div>
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-sm opacity-90">{notification.message}</p>
            </div>
          </div>
          <button onClick={onClose} className="ml-4 text-white/70 hover:text-white transition-colors">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetMeQuery();
  const [fetchChat] = useGetChatWithUserLazyQuery();
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [socketError, setSocketError] = useState<string | null>(null);
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
  const { markMessagesAsSeen, autoMarkNewMessagesAsSeen } = useMarkMessagesAsSeen(selectedUser, conversations, setConversations);

  // Handle page visibility
  usePageVisibility(refetch, setNotifications);

  // Load conversations
  useConversationsLoader(data, fetchChat, setConversations, setChatLoading);

  // Load selected chat
  useSelectedChatLoader(selectedUser, data, fetchChat, setChatLoading);

  // Auto mark messages as seen
  useAutoMarkMessagesAsSeen(selectedUser, showChatOnMobile, isMobileDetected, markMessagesAsSeen);

  // Cleanup conversations on unmount
  useEffect(() => {
    return () => {
      setConversations({});
    };
  }, []);

  // Helper function to get user status by match ID
  const getUserStatusByMatchId = useCallback(
    (matchId: string | undefined) => {
      if (!matchId || !data?.getMe?.matchIds) return undefined;
      const match = data.getMe.matchIds.find((match) => match?.id === matchId);
      const actualUserId = match?.matchedUser?.id;
      return actualUserId ? userStatuses[actualUserId] : undefined;
    },
    [data?.getMe?.matchIds, userStatuses]
  );

  // // Helper function to get actual user ID from match ID
  // const getActualUserIdFromMatch = useCallback(
  //   (matchId: string | undefined) => {
  //     if (!matchId || !data?.getMe?.matchIds) return undefined;
  //     const match = data.getMe.matchIds.find((match) => match?.id === matchId);
  //     return match?.matchedUser?.id;
  //   },
  //   [data?.getMe?.matchIds]
  // );

  const messages = useMemo(() => {
    if (!selectedUser) return [];
    return conversations[selectedUser.id] || [];
  }, [selectedUser, conversations]);

  const lastSeenMessageId = useMemo(() => {
    const seenMessages = messages.filter((m) => m.sender === 'me' && m.seen);
    if (seenMessages.length === 0) return null;
    return seenMessages[seenMessages.length - 1].id;
  }, [messages]);

  // Handle new match callback
  const handleNewMatch = useCallback(
    (matchData: any) => {
      addNewMatch(matchData);
      refetch(); // Refresh user data to get updated match list
    },
    [addNewMatch, refetch]
  );

  // Handle unmatch callback
  const handleUnmatched = useCallback(
    (matchId: string) => {
      removeMatch(matchId);
      setConversations((prev) => {
        const newConversations = { ...prev };
        delete newConversations[matchId];
        return newConversations;
      });
      // If currently viewing the unmatched conversation, clear selection
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
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        if (!sending && inputValue.trim()) {
          handleSend(inputValue, setInputValue);
        }
      }
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

  const handleSendClick = useCallback(() => {
    if (!sending && inputValue.trim()) {
      handleSend(inputValue, setInputValue);
    }
  }, [handleSend, inputValue, sending]);

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

  const handleRetryMessage = useCallback(
    (messageId: string | number) => {
      retryFailedMessage(messageId);
    },
    [retryFailedMessage]
  );

  // Get current user's status
  const currentUserStatus = getUserStatusByMatchId(selectedUser?.id);

  // Create a modified userStatuses object that maps match IDs to user statuses for ChatPerson
  const matchIdToUserStatusMap = useMemo(() => {
    const statusMap: Record<string, { status: 'online' | 'away' | 'offline'; lastSeen: string }> = {};
    if (data?.getMe?.matchIds) {
      data.getMe.matchIds.forEach((match) => {
        if (match?.id && match.matchedUser?.id) {
          const userStatus = userStatuses[match.matchedUser.id];
          if (userStatus) {
            statusMap[match.id] = userStatus;
          }
        }
      });
    }
    return statusMap;
  }, [data?.getMe?.matchIds, userStatuses]);

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

      {/* Socket Error
      {socketError && (
        <div className="w-full bg-red-500 text-white p-2 text-center text-sm">
          {socketError}
          {socketError.includes('retry') && (
            <button className="ml-2 underline hover:no-underline" onClick={() => setSocketError(null)}>
              Dismiss
            </button>
          )}
        </div>
      )} */}

      {/* Matches: show always on desktop, and on mobile only if NOT viewing ChatWindow */}
      {(!showChatOnMobile || !isMobileDetected) && (
        <div className="w-full max-w-[1330px]">
          <Matches topRowUsers={topRowUsers} selectedUser={selectedUser} onUserSelect={handleUserSelectWithErrorReset} />
        </div>
      )}

      <div className="flex w-full h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] max-w-[1330px]">
        {/* On mobile: show ChatPerson only if chat window NOT visible */}
        <div className={`${showChatOnMobile ? 'hidden' : 'flex'} md:flex w-full md:w-[350px]`}>
          <ChatPerson selectedUser={selectedUser} onUserSelect={handleUserSelectWithErrorReset} bottomUsers={bottomUsers} userStatuses={matchIdToUserStatusMap} className="" />
        </div>

        {/* On mobile: show ChatWindow only if chat window visible */}
        <div className={`${showChatOnMobile ? 'flex' : 'hidden'} w-full md:flex md:flex-1`}>
          <ChatWindow
            loading={selectedUser ? chatLoading[selectedUser.id] || false : false}
            onUnmatched={() => selectedUser && handleUnmatched(selectedUser.id)}
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

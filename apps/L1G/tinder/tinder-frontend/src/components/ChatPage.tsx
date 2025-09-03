import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
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

// Notification component
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
  const [fetchChat, { data: chatData }] = useGetChatWithUserLazyQuery();
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [inputValue, setInputValue] = useState('');
  const [socketError, setSocketError] = useState<string | null>(null);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [chatLoading, setChatLoading] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      type: string;
      title: string;
      message: string;
      timestamp: string;
    }>
  >([]);
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

  const notificationIdRef = useRef(0);
  const currentPageRef = useRef('chat');

  const { selectedUser, topRowUsers, bottomUsers, chattedUsers, handleUserSelect, moveUserToBottom, setChattedUsers, addNewMatch, removeMatch } = useUserManagement(data, conversations);

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

  // Helper function to get actual user ID from match ID
  const getActualUserIdFromMatch = useCallback(
    (matchId: string | undefined) => {
      if (!matchId || !data?.getMe?.matchIds) return undefined;

      const match = data.getMe.matchIds.find((match) => match?.id === matchId);
      return match?.matchedUser?.id;
    },
    [data?.getMe?.matchIds]
  );

  // Track if component is mounted and page visibility
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
        // Clear notifications when user comes back to the page
        setNotifications([]);
      }
    };

    const handleFocus = () => {
      refetch();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetch]);

  // Cleanup conversations on unmount
  useEffect(() => {
    return () => {
      setConversations({});
    };
  }, []);

  const messages = useMemo(() => {
    if (!selectedUser) return [];
    return conversations[selectedUser.id] || [];
  }, [selectedUser, conversations]);

  const { markMessagesAsSeen, autoMarkNewMessagesAsSeen } = useMarkMessagesAsSeen(selectedUser, conversations, setConversations);

  // Auto-mark messages as seen based on mobile/desktop and chat visibility
  useEffect(() => {
    if (!selectedUser) return;

    if (!isMobile) {
      // Desktop: mark as seen immediately
      const timeoutId = setTimeout(() => {
        markMessagesAsSeen();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // Mobile: only mark as seen if chat window is visible
      if (showChatOnMobile) {
        const timeoutId = setTimeout(() => {
          markMessagesAsSeen();
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedUser, showChatOnMobile, isMobile, markMessagesAsSeen]);

  // Load initial conversations
  useEffect(() => {
    if (!data?.getMe?.id || !data.getMe.matchIds) return;
    const loadConversations = async () => {
      const userId = data?.getMe?.id;

      if (!userId || !Array.isArray(data?.getMe?.matchIds)) return;

      const matches = data.getMe.matchIds.filter((match): match is NonNullable<typeof match> => !!match);

      for (const match of matches) {
        const participantId = match.matchedUser?.id;
        if (!participantId) continue;

        try {
          setChatLoading((prev) => ({ ...prev, [match.id]: true }));

          const result = await fetchChat({
            variables: { userId, participantId },
            fetchPolicy: 'cache-and-network',
          });

          if (result.data?.getChatWithUser) {
            const serverMessages: Message[] = result.data.getChatWithUser.messages.map(
              (msg: any): Message => ({
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

                // These are required by your Message type
                sending: false,
                failed: false,
                retrying: false,
              })
            );

            setConversations((prev) => ({
              ...prev,
              [match.id]: serverMessages.sort((a, b) => new Date(`2000-01-01 ${a.timestamp}`).getTime() - new Date(`2000-01-01 ${b.timestamp}`).getTime()),
            }));
          }
        } catch (error) {
          console.error(`Failed to load conversation for match ${match.id}:`, error);
        } finally {
          setChatLoading((prev) => ({ ...prev, [match.id]: false }));
        }
      }
    };

    loadConversations();
  }, [data?.getMe?.id, data?.getMe?.matchIds, fetchChat]);

  // Load specific chat when user is selected
  useEffect(() => {
    if (!selectedUser || !data?.getMe?.id) return;

    const matchId = selectedUser.id;
    const userId = data.getMe.id;
    const participantId = data.getMe.matchIds?.find((m: any) => m?.id === matchId)?.matchedUser?.id;
    if (!participantId) return;

    setChatLoading((prev) => ({ ...prev, [matchId]: true }));

    fetchChat({
      variables: { userId, participantId },
      fetchPolicy: 'cache-first',
    }).finally(() => {
      setChatLoading((prev) => ({ ...prev, [matchId]: false }));
    });
  }, [selectedUser, data, fetchChat]);

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

  // Handle notification callback
  const handleNotification = useCallback(
    (notificationData: any) => {
      const notification = {
        id: `notif_${++notificationIdRef.current}`,
        ...notificationData,
      };

      setNotifications((prev) => [...prev, notification]);

      // Auto-mark new messages as seen if appropriate
      if (notificationData.type === 'message' && notificationData.matchId) {
        autoMarkNewMessagesAsSeen(notificationData.matchId);
      }
    },
    [autoMarkNewMessagesAsSeen]
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

  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  }, []);

  // Get current user's status
  const currentUserStatus = getUserStatusByMatchId(selectedUser?.id);
  const actualUserId = getActualUserIdFromMatch(selectedUser?.id);

  // Debug logs with proper user ID resolution
  console.log('Selected user (match):', selectedUser);
  console.log('Selected user match ID:', selectedUser?.id);
  console.log('Actual user ID:', actualUserId);
  console.log('All user statuses:', userStatuses);
  console.log('Current user status:', currentUserStatus);

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

      {/* Socket Error */}
      {socketError && (
        <div className="w-full bg-red-500 text-white p-2 text-center text-sm">
          {socketError}
          {socketError.includes('retry') && (
            <button className="ml-2 underline hover:no-underline" onClick={() => setSocketError(null)}>
              Dismiss
            </button>
          )}
        </div>
      )}

      {/* Matches: show always on desktop, and on mobile only if NOT viewing ChatWindow */}
      {(!showChatOnMobile || !isMobile) && (
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

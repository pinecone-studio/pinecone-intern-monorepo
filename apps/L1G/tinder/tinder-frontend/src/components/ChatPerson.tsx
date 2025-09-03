import React from 'react';
import type { ChatUser } from 'types/chat';
import clsx from 'clsx';
import Avatar from './Avatar';
import { Reply, Clock, Wifi, WifiOff, ReplyIcon } from 'lucide-react';

interface LastMessage {
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  seen?: boolean;
}

interface ChatPersonProps {
  selectedUser: ChatUser | null;
  onUserSelect: (user: ChatUser) => void;
  bottomUsers: (ChatUser & {
    lastMessage?: LastMessage;
    hasUnreadMessages?: boolean;
    lastActivity?: Date;
  })[];
  userStatuses?: Record<
    string,
    {
      status: 'online' | 'away' | 'offline';
      lastSeen: string;
    }
  >;
  className?: string;
}

const ChatPerson: React.FC<ChatPersonProps> = ({ selectedUser, onUserSelect, bottomUsers, userStatuses = {}, className }) => {
  const formatTime = (timestamp: string): string => {
    try {
      const now = new Date();
      const todayDate = now.toISOString().split('T')[0];
      const fullDateTimeString = `${todayDate}T${timestamp}:00`;

      const messageTime = new Date(fullDateTimeString);

      if (isNaN(messageTime.getTime())) throw new Error('Invalid date');

      return messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return timestamp;
    }
  };

  const formatLastSeen = (timestamp: string): string => {
    const lastSeenTime = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - lastSeenTime.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffMinutes < 1) return 'now';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;

    return lastSeenTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusIndicator = (userId: string) => {
    const status = userStatuses[userId];
    if (!status) return null;

    switch (status.status) {
      case 'online':
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        );
      case 'away':
        return (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-yellow-500 border-2 border-white rounded-full flex items-center justify-center">
            <Clock className="w-2 h-2 text-white" />
          </div>
        );
      case 'offline':
        return <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gray-400 border-2 border-white rounded-full" />;
      default:
        return null;
    }
  };

  const getUnreadBadge = (hasUnread: boolean) => {
    if (!hasUnread) return null;

    return <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full border border-white animate-pulse" />;
  };

  // Sort users: unread messages first, then by last activity
  const sortedUsers = [...bottomUsers].sort((a, b) => {
    // Unread messages get priority
    if (a.hasUnreadMessages && !b.hasUnreadMessages) return -1;
    if (!a.hasUnreadMessages && b.hasUnreadMessages) return 1;

    // Then sort by last activity
    const aTime = a.lastActivity || new Date(0);
    const bTime = b.lastActivity || new Date(0);
    return bTime.getTime() - aTime.getTime();
  });

  return (
    <div className={clsx('flex flex-col bg-white', 'w-full md:w-[350px] h-full md:border-x border-t rounded-l-xl md:border-gray-200', className)}>
      {/* Header */}
      <div className="px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{bottomUsers.filter((u) => u.hasUnreadMessages).length > 0 && `${bottomUsers.filter((u) => u.hasUnreadMessages).length} unread`}</span>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {sortedUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Reply className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
            <p className="text-gray-500 text-sm">Start chatting with your matches!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sortedUsers.map((chatUser) => {
              const isSelected = selectedUser?.id === chatUser.id;
              const lastMessage = chatUser.lastMessage;
              const userStatus = userStatuses[chatUser.id];
              const hasUnread = !!chatUser.hasUnreadMessages;

              return (
                <div
                  key={chatUser.id}
                  onClick={() => onUserSelect(chatUser)}
                  className={clsx('flex items-center cursor-pointer transition-all duration-200 p-4 hover:bg-gray-50', {
                    'bg-pink-50 border-r-2 border-pink-500': isSelected,
                    'bg-white': !isSelected,
                    'hover:bg-gray-100': !isSelected,
                  })}
                >
                  {/* Avatar with Status */}
                  <div className="relative mr-3 flex-shrink-0">
                    <Avatar user={chatUser} width={52} height={52} className="rounded-full ring-2 ring-transparent transition-all duration-200" />
                    {getStatusIndicator(chatUser.id)}
                    {getUnreadBadge(hasUnread)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name and Status */}
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className={clsx('text-base font-semibold truncate', {
                          'text-gray-900': !hasUnread,
                          'text-black': hasUnread,
                        })}
                      >
                        {chatUser.name}
                      </h3>

                      {/* Time/Status */}
                      <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                        {lastMessage && (
                          <span
                            className={clsx('text-xs', {
                              'text-gray-500': !hasUnread,
                              'text-pink-600 font-medium': hasUnread,
                            })}
                          >
                            {formatTime(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Last Message Preview */}
                    {lastMessage ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 flex-1 min-w-0">
                          {lastMessage.sender === 'me' && <Reply className="w-3 h-3 text-gray-400 flex-shrink-0" />}
                          <p
                            className={clsx('text-sm truncate', {
                              'text-gray-600': !hasUnread,
                              'text-gray-900 font-medium': hasUnread,
                            })}
                          >
                            {lastMessage.text}
                          </p>
                        </div>

                        {/* Message Status Indicators */}
                        {lastMessage.sender === 'me' ? (
                          <div className="flex items-center ml-2">{lastMessage.seen ? <div className="text-xs text-pink-500"></div> : <div className="text-xs text-gray-400"></div>}</div>
                        ) : hasUnread ? (
                          <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">New Message</div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {userStatus?.status === 'online' ? 'Online now' : userStatus ? `Last seen ${formatLastSeen(userStatus.lastSeen)}` : 'Tap to start chatting'}
                        </p>
                        <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">Say Hi</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPerson;

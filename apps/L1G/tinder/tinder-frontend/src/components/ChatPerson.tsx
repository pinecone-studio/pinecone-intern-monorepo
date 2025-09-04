/* eslint-disable complexity */
/* eslint-disable max-lines */
/* eslint-disable no-unused-vars */

import React from 'react';
import type { ChatUser } from 'types/chat';
import clsx from 'clsx';
import Avatar from './Avatar';
import { Reply } from 'lucide-react';
import { formatLastSeen, formatTime, getStatusIndicator, getUnreadBadge, sortChatUsers } from 'utils/Helpers';

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
  const sortedUsers = sortChatUsers(bottomUsers);

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
                    {getStatusIndicator(userStatus?.status)}
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

                      {/* Time */}
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

                        {/* Message Status */}
                        {lastMessage.sender === 'me' ? (
                          <div className="flex items-center ml-2">{lastMessage.seen ? <div className="text-xs text-pink-500" /> : <div className="text-xs text-gray-400" />}</div>
                        ) : (
                          hasUnread && <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">New Message</div>
                        )}
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
 
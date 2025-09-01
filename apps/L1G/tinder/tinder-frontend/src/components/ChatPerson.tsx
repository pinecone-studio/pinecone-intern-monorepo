'use client';

import type React from 'react';

import type { ChatUser } from 'types/chat';
import clsx from 'clsx';
import Avatar from './Avatar';

interface ChatPersonProps {
  selectedUser: ChatUser | null;
  onUserSelect: (_user: ChatUser) => void;
  bottomUsers: ChatUser[];
  chattedUsers?: Set<string>;
  className?: string;
}

const ChatPerson: React.FC<ChatPersonProps> = ({ selectedUser, onUserSelect, bottomUsers, chattedUsers, className }) => {
  const chattedSet = chattedUsers ?? new Set<string>();

  return (
    <div className={clsx('flex flex-col bg-white', 'w-full md:w-[350px] h-full md:border-x border-t rounded-l-xl md:border-gray-200', className)}>
      <div className="px-4 h-[80px] py-4">
        <h2 className="text-[20px] font-semibold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {bottomUsers.map((chatUser) => {
          const isSelected = selectedUser?.id === chatUser.id;
          const hasChatted = chattedSet.has(chatUser.id);

          return (
            <div
              key={chatUser.id}
              onClick={() => onUserSelect(chatUser)}
              className={clsx('flex items-center cursor-pointer border-b border-gray-100 hover:bg-gray-100 p-4 transition-colors gap-4', isSelected && 'bg-white', hasChatted && 'bg-gray-850')}
            >
              <Avatar user={chatUser} width={56} height={56} className="rounded-full" />

              <div className="flex flex-col flex-1 min-w-0">
                <p className={clsx('text-[16px] font-medium truncate', isSelected ? 'text-pink-400' : 'text-white')}>{chatUser.name}</p>

                <p className="text-[14px] text-gray-400 truncate">
                  {chatUser.profession} • {chatUser.age}
                </p>

                <p className="text-[13px] text-gray-500 truncate mt-1">Tap to start chatting...</p>
              </div>

              {hasChatted && <div className="w-3 h-3 bg-pink-500 rounded-full flex-shrink-0"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatPerson;

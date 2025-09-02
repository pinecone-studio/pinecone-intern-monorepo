'use client';

import type React from 'react';

import type { ChatUser } from 'types/chat';
import clsx from 'clsx';
import Avatar from './Avatar';
import { Reply } from 'lucide-react';

interface LastMessage {
  text: string;
  sender: 'me' | 'them';
}

interface ChatPersonProps {
  selectedUser: ChatUser | null;
  onUserSelect: (_user: ChatUser) => void;
  bottomUsers: (ChatUser & { lastMessage?: LastMessage })[];
  chattedUsers?: Set<string>;
  className?: string;
}

const ChatPerson: React.FC<ChatPersonProps> = ({ selectedUser, onUserSelect, bottomUsers, chattedUsers, className }) => {
  const chattedSet = chattedUsers ?? new Set<string>();

  return (
    <div className={clsx('flex flex-col bg-white', 'w-full md:w-[350px] h-full md:border-x border-t rounded-l-xl md:border-gray-200', className)}>
      <div className="px-4 h-[80px] py-4">
        <p className="text-[20px] font-semibold">Messages</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {bottomUsers.map((chatUser) => {
          const isSelected = selectedUser?.id === chatUser.id;
          const hasChatted = chattedSet.has(chatUser.id);
          const lastMessage = chatUser.lastMessage;

          return (
            <div
              key={chatUser.id}
              onClick={() => onUserSelect(chatUser)}
              className={clsx(
                'flex items-center justify-center cursor-pointer border-b border-gray-100 hover:bg-gray-100 p-4 transition-colors gap-4',
                isSelected && 'bg-gray-100',
                hasChatted && 'bg-gray-850'
              )}
            >
              <Avatar user={chatUser} width={56} height={56} className="rounded-full" />

              <div className="flex flex-col flex-1 min-w-0">
                <h3 className={clsx('text-[16px] truncate font-semibold text-black')}>{chatUser.name}</h3>

                {lastMessage ? (
                  lastMessage.sender === 'me' ? (
                    <p className="text-[13px] text-gray-500 truncate mt-1 flex items-center gap-1">
                      <Reply className="inline" size={14} /> {lastMessage.text}
                    </p>
                  ) : (
                    <>
                      <p className="text-[13px] text-gray-500 truncate mt-1">{lastMessage.text}</p>
                    </>
                  )
                ) : (
                  <p className="text-[13px] text-gray-500 truncate mt-1"></p>
                )}
              </div>
              {lastMessage ? (
                lastMessage.sender === 'me' ? (
                  <p className="hidden">none</p>
                ) : (
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 w-fit h-[30px] rounded-full flex justify-center items-center">
                    <p className="text-[13px] text-white p-2">Your turn</p>
                  </div>
                )
              ) : (
                <p className="text-[13px] text-gray-500 truncate mt-1"></p>
              )}
              {lastMessage ? (
                <p className="hidden">none</p>
              ) : (
                <div className="bg-gradient-to-r from-pink-500 to-red-500 w-fit h-[30px] rounded-full flex justify-center items-center">
                  <p className="text-[13px] text-white p-2">Your turn</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatPerson;

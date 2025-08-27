'use client';

import Avatar from './Avatar';
import clsx from 'clsx';
import { ChatUser } from './ChatPage';

interface ChatPersonProps {
  selectedUser: ChatUser | null;
  onUserSelect: (_user: ChatUser) => void;
  bottomUsers: ChatUser[];
  chattedUsers?: Set<string>;
}

const ChatPerson: React.FC<ChatPersonProps> = ({ selectedUser, onUserSelect, bottomUsers, chattedUsers }) => {
  const chattedSet = chattedUsers ?? new Set<string>();

  return (
    <div className="flex flex-col w-[300px] border-r border-gray-300">
      {bottomUsers.map((chatUser) => {
        const isSelected = selectedUser?.id === chatUser.id;
        const hasChatted = chattedSet.has(chatUser.id);

        return (
          <div
            key={chatUser.id}
            onClick={() => onUserSelect(chatUser)}
            className={clsx('flex items-center cursor-pointer border-b border-gray-200 hover:bg-gray-100 p-4 transition gap-4', isSelected && 'bg-gray-200', hasChatted && 'bg-white-100')}
          >
            <Avatar user={chatUser} size={48} />

            <div className="flex flex-col">
              <p className={clsx('text-[14px] font-medium', isSelected ? 'text-red-600' : 'text-black')}>
                {chatUser.name}, {chatUser.age}
              </p>

              <p className="text-[13px] text-gray-500">{chatUser.profession}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatPerson;

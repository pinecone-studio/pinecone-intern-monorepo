'use client';

import React from 'react';
import Avatar from './Avatar';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string[];
}

interface AvatarProps {
  user: User;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 48 }) => {
  const hasImage = !!user.avatar?.trim();
  const defaultAvatar = '/profile.jpg';

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

              <p className="text-[13px] text-gray-500">{chatUser.job}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatPerson;

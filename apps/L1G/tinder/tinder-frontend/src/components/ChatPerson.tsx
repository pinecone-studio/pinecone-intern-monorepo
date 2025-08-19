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
    <div className="w-full h-[900px] flex justify-center items-start">
      <div className="w-full max-w-[1280px] flex h-full">
        <div data-testid="sidebar" className="w-full lg:w-[300px] border-r border-gray-300 flex flex-col">
          {matches.map((user, idx) => (
            <div key={user.id} className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${idx !== matches.length - 1 ? 'border-b border-gray-300' : ''}`}>
              <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full object-cover" />
              <div>
                <p className="text-[14px] font-medium text-gray-900">
                  {user.name}, {user.age}
                </p>
                <p className="text-[12px] text-gray-500">{user.job}</p>
              </div>
            </div>
          ))}
        </div>

        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPerson;

'use client';

import React from 'react';
import UnmatchButton from './UnmatchButton';
import ViewProfile from './ViewProfile';
import Avatar from './Avatar';

type User = {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string[];
};

interface ChatHeaderProps {
  user: User;
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-r border-gray-200">
      <div className="flex items-center gap-3">
        <Avatar user={user} size={48} />
        <div>
          <h2 className="text-[14px] font-medium text-gray-900">
            {user.name}, {user.age}
          </h2>
          <p className="text-[14px] text-gray-500">{user.job}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <ViewProfile user={user} />
        <UnmatchButton />
      </div>
    </div>
  );
};

export default ChatHeader;

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

interface ChatPersonProps {
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
  bottomUsers: User[];
  chattedUsers?: Set<number>;
}

const ChatPerson = ({ selectedUser, onUserSelect, bottomUsers, chattedUsers = new Set<number>() }: ChatPersonProps) => {
  return (
    <div className="flex flex-col w-[300px] border-r border-gray-300">
      {bottomUsers.map((user) => {
        const isSelected = selectedUser?.id === user.id;
        const hasChatted = chattedUsers.has(user.id);

        return (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`flex items-center cursor-pointer border-b border-gray-200 
              hover:bg-gray-100 p-4 transition gap-4
              ${isSelected ? 'bg-gray-200' : ''}`}
          >
            <Avatar user={user} size={48} />

            <div className="flex flex-col">
              <p
                className={`text-[14px] font-medium 
                  ${isSelected ? 'text-red-600' : 'text-black'}`}
              >
                {user.name}, {user.age}
              </p>

              <p className="text-[13px] text-gray-500">{user.job}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatPerson;

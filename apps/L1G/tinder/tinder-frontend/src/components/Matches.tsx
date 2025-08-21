'use client';

import React from 'react';
import clsx from 'clsx';
import Avatar from './Avatar';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string[];
}

interface MatchesProps {
  topRowUsers: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

export default function Matches({ topRowUsers, selectedUser, onUserSelect }: MatchesProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-[1280px] px-4 border-b border-gray-200">
        <p className="text-[20px] font-medium py-4">Matches</p>

        <div className="flex gap-8 pb-4 overflow-x-auto">
          {topRowUsers.map((user) => {
            const isSelected = selectedUser?.id === user.id;

            return (
              <div
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={clsx('flex flex-col items-center min-w-[60px] cursor-pointer transition-opacity hover:opacity-80', isSelected ? 'opacity-100' : 'opacity-70')}
              >
                <Avatar user={user} size={40} />

                <p className={clsx('text-[14px] font-medium mt-3 text-center', isSelected ? 'text-red-600' : 'text-black')}>
                  {user.name}, {user.age}
                </p>

                <p className="text-[13px] text-gray-500 text-center">{user.job}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

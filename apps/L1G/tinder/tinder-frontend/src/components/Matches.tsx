'use client';

import React from 'react';
import Image from 'next/image';

const matches = [
  {
    name: 'Mark Zuckerberg',
    age: 40,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Eleanor Pena',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Wade Warren',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Wade Warren',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Wade Warren ahahjad ajdjajka askjdh',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
];

interface AvatarProps {
  user: User;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 48 }) => {
  const hasImage = !!user.avatar?.trim();
  const defaultAvatar = '/profile.jpg';

  return (
    <div className="relative">
      <Image src={hasImage ? user.avatar : defaultAvatar} alt={user.name || 'Avatar'} width={size} height={size} className="rounded-full object-cover" />
    </div>
  );
};

interface MatchesProps {
  topRowUsers: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

const Matches: React.FC<MatchesProps> = ({ topRowUsers, selectedUser, onUserSelect }) => {
  return (
    <div className="w-full max-w-[1280px] pt-6 border-b border-gray-200 gap-2 px-3">
      <p className="text-[16px] md:text-[20px] font-medium ">Matches</p>
      <div className="flex items-center no-scrollbar py-2 overflow-scroll">
        {matches.map((user, idx) => (
          <div key={idx} className="flex flex-col items-center justify-start min-w-max w-fit rounded-lg cursor-pointer gap-2 p-3 md:p-6">
            <Image src={user.avatar} alt={user.name} width={40} height={40} className="object-cover w-[40px] h-[40px] rounded-full" />

            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-[12px] md:text-[14px] font-medium mt-3 text-center whitespace-nowrap">
                {user.name} <span className="hidden md:inline">, {user.age}</span>
              </p>

              <p className="text-[12px] text-gray-500 text-center hidden md:block ">{user.job}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

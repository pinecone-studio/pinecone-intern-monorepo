'use client';

import React from 'react';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string;
}

interface AvatarProps {
  user: User;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 48 }) => {
  const hasImage = !!user.avatar?.trim();
  const defaultAvatar = '/profile.jpg';

  return (
    <div className="relative">
      <Image
        src={hasImage ? user.avatar : defaultAvatar}
        alt={user.name || 'Avatar'}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    </div>
  );
};

interface MatchesProps {
  topRowUsers: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

const Matches: React.FC<MatchesProps> = ({
  topRowUsers,
  selectedUser,
  onUserSelect,
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[1280px] px-4 border-b border-gray-200">
        <p className="text-[20px] font-medium py-4">Matches</p>
        <div className="flex gap-8 overflow-x-auto pb-2">
          {topRowUsers.map((user) => {
            const isSelected = selectedUser?.id === user.id;
            return (
              <div
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`flex flex-col items-center min-w-[60px] cursor-pointer hover:opacity-80 transition-opacity ${
                  isSelected ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <Avatar user={user} size={40} />
                <p
                  className={`text-[14px] font-medium mt-3 text-center ${
                    isSelected ? 'text-red-600' : 'text-black'
                  }`}
                >
                  {user.name}, {user.age}
                </p>
                <p className="text-[12px] text-gray-500 text-center">{user.job}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;



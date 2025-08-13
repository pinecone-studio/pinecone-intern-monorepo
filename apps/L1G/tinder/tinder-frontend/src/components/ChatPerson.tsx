'use client';

import Image from 'next/image';
import React from 'react';

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

interface ChatPersonProps {
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
  bottomUsers: User[];
}

const ChatPerson: React.FC<ChatPersonProps> = ({
  selectedUser,
  onUserSelect,
  bottomUsers,
}) => {
  return (
   
      
        <div className="flex flex-col gap-6 w-[300px] border-r border-gray-300">
          {bottomUsers.map((user) => {
            const isSelected = selectedUser?.id === user.id;
            return (
              <div
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition ${
                  isSelected ? 'bg-gray-200' : ''
                }`}
              >
                <Avatar user={user} size={48} />
                <div>
                  <p
                    className={`text-[16px] font-medium ${
                      isSelected ? 'text-red-600' : 'text-black'
                    }`}
                  >
                    {user.name}, {user.age}
                  </p>
                  <p className="text-[14px] text-gray-500">{user.job}</p>
                </div>
              </div>
            );
          })}
       
        
      
    </div>
  );
};

export default ChatPerson;


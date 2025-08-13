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
];

export const Matches = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[1280px] px-4 border-b border-gray-200">
        <p className="text-[20px] font-medium py-4">Matches</p>
        <div className="flex items-center gap-8 no-scrollbar py-2">
          {matches.map((user, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center min-w-[100px] p-3 rounded-lg cursor-pointer"
            >
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-[14px] font-medium mt-3 text-center">
                {user.name}, {user.age}
              </p>
              <p className="text-[12px] text-gray-500 text-center">{user.job}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



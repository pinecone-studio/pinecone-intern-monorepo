'use client';

import React from 'react';
import Image from 'next/image';
import ChatWindow from './ChatWindow';

const matches = [
  {
    id: 1,
    name: 'Esther Howard',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    id: 2,
    name: 'Kathryn Murphy',
    age: 24,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    id: 3,
    name: 'Guy Hawkins',
    age: 41,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    id: 4,
    name: 'Jacob Jones',
    age: 20,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
];

const ChatPerson = () => {
  return (
    <div className="w-full h-[900px] flex justify-center items-start">
      <div className="w-full max-w-[1280px] flex h-full">
        <div className="w-full lg:w-[300px] border-r border-gray-300 flex flex-col">
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

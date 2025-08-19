'use client';

import React from 'react';
import { MessageSquare, Send, MessageSquareDashedIcon } from 'lucide-react';
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

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
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
      <Image src={hasImage ? user.avatar : defaultAvatar} alt={user.name || 'Avatar'} width={size} height={size} className="rounded-full object-cover" />
    </div>
  );
};

const ChatWindow = () => {
  return (
    <div className="flex flex-col h-[900px] hidden lg:block w-full">
      <div className="flex items-center gap-4 border-b border-gray-200">
        <div className="flex justify-between w-full p-4">
          <div className="flex gap-2 items-center">
            <Image src={selectedUser.avatar} alt={selectedUser.name} width={48} height={48} className="rounded-full object-cover" />
            <div>
              <p className="text-[16px] font-medium">
                {selectedUser.name}, {selectedUser.age}
              </p>
              <p className="text-[14px] text-gray-500">{selectedUser.job}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="button" aria-label="View Profile" className="w-[112px] h-[40px] text-black text-[14px] font-medium bg-white border hover:bg-gray-100">
              View Profile
            </Button>
            <Button type="button" aria-label="Unmatch" className="w-[112px] h-[40px] text-black text-[14px] font-medium bg-white border hover:bg-gray-100">
              Unmatch
            </Button>
          </div>
        </div>
      </div>
    );
  }

      <div className="flex flex-col justify-center items-center flex-grow gap-2 mt-8">
        <MessageSquareDashedIcon size={48} color="gray" />
        <p className="text-[14px] font-medium">Say Hi!</p>
        <p className="text-[14px] text-[#71717A] text-center max-w-[358px]">You have got a match! Send a message to start chatting.</p>
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center gap-2">
        <input type="text" placeholder="Say something nice" className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500" />
        <button className="bg-[#F43F5E] flex items-center gap-1 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600 transition">
          <Send size={14} />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

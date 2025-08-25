'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Heart, MessageSquareDashedIcon } from 'lucide-react';
import UnmatchButton from './UnmatchButton';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string;
}

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

interface ChatWindowProps {
  selectedUser: User | null;
  messages: Message[];
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser, messages, inputValue, onInputChange, onKeyDown, onSend }) => {
  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MessageSquare size={64} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a match to start chatting</h3>
          <p className="text-gray-500">Choose someone from your matches to begin a conversation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[960px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Avatar user={selectedUser} size={48} />
          <div>
            <h2 className="font-medium text-gray-900">
              {selectedUser.name}, {selectedUser.age}
            </h2>
            <p className="text-sm text-gray-500">{selectedUser.job}</p>
          </div>
        </div>
        <UnmatchButton />
      </div>

      {/* Message Area */}
      <div className="flex-1 p-4 space-y-4 bg-gray-50 h-[790px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquareDashedIcon size={48} color="gray" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Say Hi!</h3>
            <p className="text-gray-500 text-[16px]">You’ve got a match! Send a message to start chatting.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  msg.sender === 'me' ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white' : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-pink-100' : 'text-gray-500'}`}>{msg.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Say something nice"
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
          />
          <button
            onClick={onSend}
            disabled={!inputValue.trim()}
            className="flex items-center gap-1 px-4 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

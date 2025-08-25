'use client';

import React from 'react';
import { MessageSquare, Send, MessageSquareDashedIcon } from 'lucide-react';

import ChatHeader from './ChatHeader';

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


interface ChatWindowProps {
  selectedUser: User | null;
  messages: Message[];
  inputValue: string;
  onInputChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (_e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatWindow = ({ selectedUser, messages, inputValue, onInputChange, onKeyDown, onSend }: ChatWindowProps) => {
  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">

          <MessageSquare size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">Select a match to start chatting</h3>
          <p className="text-gray-500">Choose someone from your matches to begin a conversation.</p>
        </div>
        <div className="flex gap-2">
          <ViewProfile user={selectedUser} />
          <UnmatchButton />
        </div>
      </div>
    );
  }


  return (
    <div className="w-[980px] h-[930px] flex flex-col border-r border-gray-200">
      <ChatHeader user={selectedUser} />

      <div className="flex-1 p-4 space-y-4 bg-white h-[790px] overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageSquareDashedIcon size={48} color="gray" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">Say Hi!</h3>
            <p className="text-gray-500 text-[16px]">You have got a match! Send a message to start chatting.</p>
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

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Say something nice"
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onKeyDown}

            className="flex-1 px-4 py-2 text-sm bg-gray-100 border-0 outline-none rounded-xl focus:ring-2 focus:ring-pink-500 focus:bg-white"
          />
          <button
            onClick={onSend}
            disabled={!inputValue.trim()}

            className="flex items-center gap-1 px-4 py-2 text-sm text-white transition-all rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
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


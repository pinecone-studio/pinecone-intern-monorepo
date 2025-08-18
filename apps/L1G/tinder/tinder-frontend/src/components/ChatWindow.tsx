'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MessageSquareDashedIcon, Send } from 'lucide-react';
import { socket } from 'utils/socket';

const selectedUser = {
  id: 'USER_2_ID', // <-- real participant ID
  name: 'Bessie Cooper',
  age: 32,
  job: 'Software Engineer',
  avatar: '/profile.jpg',
};

const currentUserId = 'USER_1_ID'; // <-- replace with actual logged-in user ID (e.g. from context)
const matchId = 'MATCH_ID_123'; // <-- replace with real matchId from DB

const ChatWindow = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Connect and join room
  useEffect(() => {
    socket.connect();

    socket.emit('join', matchId);

    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [matchId]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      matchId,
      senderId: currentUserId,
      receiverId: selectedUser.id,
      content: messageInput,
    };

    socket.emit('send_message', newMessage);
    setMessageInput('');
  };

  return (
    <div className="flex-1 flex flex-col h-[900px]">
      {/* Header */}
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
            <Button className="w-[112px] h-[40px] text-black bg-white border hover:bg-gray-100">View Profile</Button>
            <Button className="w-[112px] h-[40px] text-black bg-white border hover:bg-gray-100">Unmatch</Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-2 mt-8">
            <MessageSquareDashedIcon size={48} color="gray" />
            <p className="text-[14px] font-medium">Say Hi!</p>
            <p className="text-[14px] text-[#71717A] text-center max-w-[358px]">You have got a match! Send a message to start chatting.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-2 px-3 rounded-lg my-2 text-sm ${msg.senderId === currentUserId ? 'bg-pink-500 text-white self-end ml-auto' : 'bg-gray-200 text-black self-start mr-auto'}`}
            >
              {msg.content}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="Say something nice"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button onClick={handleSendMessage} className="bg-[#F43F5E] flex items-center gap-1 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600 transition">
          <Send size={14} />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

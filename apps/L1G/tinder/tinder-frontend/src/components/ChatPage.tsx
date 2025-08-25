'use client';

import React, { useState } from 'react';
import React, { useState } from 'react';
import ChatPerson from '@/components/ChatPerson';
import ChatWindow from '@/components/ChatWindow';
import Matches from '@/components/Matches';

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

const matches: User[] = [
  { id: 1, name: 'Leslie Alexander', age: 24, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 2, name: 'Eleanor Pena', age: 32, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 3, name: 'Wade Warren', age: 32, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 4, name: 'Courtney Henry', age: 32, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 5, name: 'Marvin McKinney', age: 32, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 6, name: 'Dianne Russell', age: 32, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 7, name: 'Brooklyn Simmons', age: 25, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 8, name: 'Bessie Cooper', age: 32, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 9, name: 'Esther Howard', age: 32, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 10, name: 'Kathryn Murphy', age: 24, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 11, name: 'Guy Hawkins', age: 41, job: 'Software Engineer', avatar: '/profile.jpg' },
  { id: 12, name: 'Jacob Jones', age: 20, job: 'Software Engineer', avatar: '/profile.jpg' },
];

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(matches[8]); // Default Esther
  const [topRowUsers, setTopRowUsers] = useState<User[]>(matches.slice(0, 7));
  const [bottomUsers, setBottomUsers] = useState<User[]>(matches.slice(7));
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! How's your day going?",
      sender: 'them',
      timestamp: '2:47',
    },
    {
      id: 2,
      text: "Hi! It's going well, thanks! Just finished a hike. How about you?",
      sender: 'me',
      timestamp: '2:47',
    },
    {
      id: 3,
      text: "That sounds awesome! I'm just relaxing at home. Do you hike often?",
      sender: 'them',
      timestamp: '2:47',
    },
    {
      id: 4,
      text: "I'd love to join you sometime.",
      sender: 'them',
      timestamp: '2:47',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);

    if (user.id !== 9) {
      setMessages([]);
    } else {
      setMessages([
        {
          id: 1,
          text: "Hey there! How's your day going?",
          sender: 'them',
          timestamp: '2:47',
        },
        {
          id: 2,
          text: "Hi! It's going well, thanks! Just finished a hike. How about you?",
          sender: 'me',
          timestamp: '2:47',
        },
        {
          id: 3,
          text: "That sounds awesome! I'm just relaxing at home. Do you hike often?",
          sender: 'them',
          timestamp: '2:47',
        },
        {
          id: 4,
          text: "I'd love to join you sometime.",
          sender: 'them',
          timestamp: '2:47',
        },
      ]);
    }
  };

  const handleSend = (): void => {
    if (!inputValue.trim() || !selectedUser) return;

    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'me',
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    if (!topRowUsers.find((u) => u.id === selectedUser.id)) {
      const newTopRow = [selectedUser, ...topRowUsers.slice(0, 6)];
      setTopRowUsers(newTopRow);
    }

    if (!bottomUsers.find((u) => u.id === selectedUser.id)) {
      setBottomUsers([selectedUser, ...bottomUsers]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div>
    <div>
      <Matches topRowUsers={topRowUsers} selectedUser={selectedUser} onUserSelect={handleUserSelect} />

      <div className="flex justify-center">
        <ChatPerson selectedUser={selectedUser} onUserSelect={handleUserSelect} bottomUsers={bottomUsers} />
        <ChatWindow selectedUser={selectedUser} messages={messages} inputValue={inputValue} onInputChange={handleInputChange} onKeyDown={handleKeyDown} onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
};

export default ChatPage;

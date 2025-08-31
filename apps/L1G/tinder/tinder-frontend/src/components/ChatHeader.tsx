'use client';

import React from 'react';
import UnmatchButton from './UnmatchButton';
import ViewProfile from './ViewProfile';
import Avatar from './Avatar';
import { ChatUser } from 'types/chat';

interface ChatHeaderProps {
  user: ChatUser;
  matchId: string | undefined;
}

const ChatHeader = ({ user, matchId }: ChatHeaderProps) => {
  console.log(user);

  return (
    <div data-testid="chat-header" className="flex items-center justify-between p-4 border-b border-r border-gray-200">
      <div className="flex items-center gap-3">
        <Avatar user={user} size={48} />
        <div>
          <h2 className="text-[14px] font-medium text-gray-900">
            {user.name}, {user.age}
          </h2>
          <p className="text-[14px] text-gray-500">{user.profession}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <ViewProfile user={user} />
        {matchId && <UnmatchButton matchId={matchId} />}
      </div>
    </div>
  );
};

export default ChatHeader;

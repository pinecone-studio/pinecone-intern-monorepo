'use client';

import type React from 'react';
import clsx from 'clsx';
import Avatar from './Avatar';
import type { ChatUser } from 'types/chat';

interface MatchesProps {
  topRowUsers: ChatUser[];
  selectedUser: ChatUser | null;
  onUserSelect: (_user: ChatUser) => void;
}

const Matches: React.FC<MatchesProps> = ({ topRowUsers, selectedUser, onUserSelect }) => {
  return (
    <div className="w-full max-w-[1330px] bg-white">
      <div className="w-full  mx-auto px-4">
        <p className="text-[20px] font-semibold py-4">New Matches</p>

        <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
          {topRowUsers.map((person) => {
            const isSelected = selectedUser?.id === person.id;

            return (
              <div
                key={person.id}
                onClick={() => onUserSelect(person)}
                className={clsx('flex flex-col items-center min-w-[80px] cursor-pointer transition-all hover:scale-105', isSelected ? 'opacity-100' : 'opacity-80')}
              >
                <div className={clsx('rounded-full p-1', person === topRowUsers[0] ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : '')}>
                  <Avatar user={person} size={60} />
                </div>

                <p className={clsx('text-[12px] font-medium mt-2 text-center truncate w-full', isSelected ? 'text-pink-400' : 'text-white')}>{person.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;

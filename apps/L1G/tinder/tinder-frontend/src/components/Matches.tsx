'use client';

import type React from 'react';
import clsx from 'clsx';
import Avatar from './Avatar';
import type { ChatUser } from 'types/chat';
import Image from 'next/image';

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
          <div className="flex flex-col items-center min-w-[80px]">
            <div className="rounded-xl overflow-hidden w-[90px] h-[130px] relative">
              <Image src="/profile.jpg" alt="Someone liked you" width={90} height={130} className="object-cover w-full h-full filter blur-sm brightness-75" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <p className="text-[14px] font-semibold">+12</p>
              </div>
            </div>
            <p className={`text-[12px] font-medium mt-2 text-center truncate w-full text-black`}>Likes</p>
          </div>
          {topRowUsers.map((person) => {
            const isSelected = selectedUser?.id === person.id;

            return (
              <div
                key={person.id}
                onClick={() => onUserSelect(person)}
                className={clsx('flex flex-col items-center min-w-[80px] cursor-pointer transition-all hover:scale-105', isSelected ? 'opacity-100' : 'opacity-80')}
              >
                <div className={clsx('rounded-xl w-[90px] h-[130px] ')}>
                  <Avatar className="rounded-xl" user={person} width={90} height={130} />
                </div>

                <p className={clsx('text-[12px] font-medium mt-2 text-center truncate w-full', isSelected ? 'text-pink-400' : 'text-black')}>{person.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;

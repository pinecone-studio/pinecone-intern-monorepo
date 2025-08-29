import React from 'react';
import clsx from 'clsx';
import Avatar from './Avatar';
import { ChatUser } from 'types/chat';

interface MatchesProps {
  topRowUsers: ChatUser[];
  selectedUser: ChatUser | null;
  onUserSelect: (_user: ChatUser) => void;
}

const Matches: React.FC<MatchesProps> = ({ topRowUsers, selectedUser, onUserSelect }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-[1280px] px-4 border-b border-gray-200">
        <p className="text-[20px] font-medium py-4">Matches</p>

        <div className="flex gap-8 pb-4 overflow-x-auto">
          {topRowUsers.map((person) => {
            const isSelected = selectedUser?.id === person.id;

            return (
              <div
                key={person.id}
                onClick={() => onUserSelect(person)}
                className={clsx('flex flex-col items-center min-w-[60px] cursor-pointer transition-opacity hover:opacity-80', isSelected ? 'opacity-100' : 'opacity-70')}
              >
                <Avatar user={person} size={40} />

                <p className={clsx('text-[14px] font-medium mt-3 text-center', isSelected ? 'text-red-600' : 'text-black')}>
                  {person.name}, {person.age}
                </p>

                <p className="text-[13px] text-gray-500 text-center">{person.profession}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;

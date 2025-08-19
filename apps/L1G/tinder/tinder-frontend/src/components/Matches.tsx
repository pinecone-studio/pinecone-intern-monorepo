'use client';

import React from 'react';
import Avatar from './Avatar';

interface User {
  id: number;
  name: string;
  age: number;
  job: string;
  avatar: string[];
}

interface MatchesProps {
  topRowUsers: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

const Matches = ({ topRowUsers, selectedUser, onUserSelect }: MatchesProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-[1280px] px-4 border-b border-gray-200">
        <p className="text-[20px] font-medium py-4">Matches</p>

        <div className="flex gap-8 pb-4 overflow-x-auto">
          {topRowUsers.map((user) => {
            const isSelected = selectedUser?.id === user.id;

            return (
              <div
                key={user.id}
                onClick={() => onUserSelect(user)}
                className={`flex flex-col items-center min-w-[60px] cursor-pointer
                  hover:opacity-80 transition-opacity
                  ${isSelected ? 'opacity-100' : 'opacity-70'}`}
              >
                <Avatar user={user} size={40} />

                <p
                  className={`text-[14px] font-medium mt-3 text-center
                    ${isSelected ? 'text-red-600' : 'text-black'}`}
                >
                  {user.name}, {user.age}
                </p>

                <p className="text-[13px] text-gray-500 text-center">{user.job}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;

// import React from 'react';
// import Avatar from './Avatar';

// interface User {
//   id: number;
//   name: string;
//   age: number;
//   job: string;
//   avatar: string[];
// }

// interface MatchesProps {
//   topRowUsers: User[];
//   selectedUser: User | null;
//   onUserSelect: (user: User) => void;
// }

// const Matches: React.FC<MatchesProps> = ({ topRowUsers, selectedUser, onUserSelect }) => {
//   return (
//     <div data-testid="matches-root" className="w-full">
//       <div data-testid="matches-inner" className="max-w-[1280px] mx-auto">
//         <h2 className="text-[20px] font-medium mb-4">Matches</h2>
//         <div data-testid="users-container" className="flex gap-4 overflow-x-auto">
//           {topRowUsers.map((user) => (
//             <div
//               key={user.id}
//               data-testid={`user-${user.id}`}
//               className={`flex flex-col items-center cursor-pointer ${selectedUser?.id === user.id ? 'text-red-600' : 'text-black'}`}
//               onClick={() => onUserSelect(user)}
//             >
//               <Avatar user={user} size={40} />
//               <span>{`${user.name}, ${user.age}`}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Matches;

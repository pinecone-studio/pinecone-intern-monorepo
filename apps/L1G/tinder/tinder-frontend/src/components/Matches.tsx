import React from 'react';

const matches = [
  {
    name: 'Mark Zuckerberg',
    age: 40,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Eleanor Pena',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Wade Warren',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Wade Warren',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
  {
    name: 'Wade Warren ahahjad ajdjajka askjdh',
    age: 32,
    job: 'Software Engineer',
    avatar: '/profile.jpg',
  },
];

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

interface MatchesProps {
  topRowUsers: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

const Matches: React.FC<MatchesProps> = ({ topRowUsers, selectedUser, onUserSelect }) => {
  return (
    <div className="w-full flex justify-center items-center">
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

                <p className="text-[13px] text-gray-500 text-center">{person.job}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Matches;

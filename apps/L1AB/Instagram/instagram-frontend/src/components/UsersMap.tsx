'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import { userContext } from '@/app/(main)/layout';
import { User } from '@/generated';

export const UsersMap = () => {
  const { users }: any = useContext(userContext);
  const slicedUsers = Array.isArray(users) ? users.slice(0, 5) : [];
  return (
    <div className="flex flex-col pt-4 gap-4">
      {slicedUsers.slice(0, 5).map((user: User, index: number) => (
        <div key={index} className="rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.profilePicture} alt="@shadcn" />
              <AvatarFallback className="uppercase">{user.username.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p data-testid="username" className="font-semibold">
                {user.username}
              </p>
            </div>
          </div>
          <p className="text-sm  text-[#2563EB] text-[14px]  hover:bg-white bg-white">Follow</p>
        </div>
      ))}
    </div>
  );
};

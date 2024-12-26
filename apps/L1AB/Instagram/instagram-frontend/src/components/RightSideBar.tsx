'use client';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useContext } from 'react';
import { UserContext } from './providers';
import Link from 'next/link';
import LogoutDialog from './LogoutButton';

const RightSideBar = () => {
  const { user }: any = useContext(UserContext);
  return (
    <div className="flex flex-col w-[326px]" data-cy="RightSideBar">
      <div className="flex w-full h-[56px] justify-between items-center">
        <Link href={`/profile?type=posts&username=${user?.username}`} className="cursor-pointer flex items-center gap-3">
          <Avatar className="w-10 h-10 flex items-center justify-center">
            <AvatarImage src={user?.profilePicture} alt={user?.username} />
            <AvatarFallback className="uppercase text-[#ccc]">{user?.username.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold " data-testid="username">
              {user?.username}
            </h3>
            <h4 className="text-sm font-sans  text-[#71717A]">{user?.fullname}</h4>
          </div>
        </Link>
        <LogoutDialog />
      </div>
    </div>
  );
};

export default RightSideBar;

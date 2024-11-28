'use client';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useContext } from 'react';
import { UserContext } from './providers';
import Link from 'next/link';

const RightSideBar = () => {
  const { user }: any = useContext(UserContext);
  return (
    <div className="flex flex-col w-[326px]" data-cy="RightSideBar">
      <div className="flex w-full h-[56px] justify-between items-center">
        <Link href={`/profile?type=posts&username=${user?.username}`} className="flex items-center gap-3">
          <Avatar className="w-10 h-10 flex items-center justify-center">
            <AvatarImage src={user?.profilePicture} alt={user?.username} />
            <AvatarFallback className="uppercase text-[#ccc]">{user?.username.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold" data-testid="username">
              {user?.username}
            </h3>
            <h4>{user?.fullname}</h4>
          </div>
        </Link>
        <button
          data-testid="btn-logout"
          className="text-[11px] font-semibold text-[#2563EB]"
          onClick={() => {
            localStorage.removeItem('userToken');
            location.reload();
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;

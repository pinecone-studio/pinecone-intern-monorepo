'use client';
import { userContext } from '@/app/(main)/layout';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useContext } from 'react';

const RightSideBar = () => {
  const { user }: any = useContext(userContext);
  return (
    <div className="flex flex-col w-[326px]" data-cy="RightSideBar">
      <div className="flex w-full h-[56px] justify-between items-center">
        <div className="flex items-center gap-3">
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
        </div>
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

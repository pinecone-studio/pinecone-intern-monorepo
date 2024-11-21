'use client';
import { Avatar } from '@/components/ui/avatar';
import { useGetAllUsersQuery } from '@/generated';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect, useState } from 'react';

interface RightSideBarProps {
  user?: {
    _id: string;
    email: string;
    username: string;
    fullname: string;
    gender: string;
    password: string;
    profilePicture: string;
    bio: string;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const getLoggedInUserIdentifier = () => {
  const token = localStorage.getItem('userToken');
  if (!token) return null;

  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    console.log('Decoded Payload:', payload);

    return payload._doc?.username || payload._doc?.email;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const RightSideBar: React.FC<RightSideBarProps> = ({ user }) => {
  const { data } = useGetAllUsersQuery();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const users = data?.getAllUsers;

  const loggedInUserIdentifier = getLoggedInUserIdentifier();

  const loggedInUser = users?.find((user) => user.username === loggedInUserIdentifier || user.email === loggedInUserIdentifier) || user;

  if (!loggedInUser) {
    return (
      <div className="flex flex-col w-[326px] items-center" data-testid="no-logged-user-desc">
        <p className="text-red-500">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[326px]">
      <div className="flex w-full h-[56px] justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.profilePicture} alt={loggedInUser.username} />
            <AvatarFallback>{loggedInUser?.username}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold" data-testid="username">
              {loggedInUser.username || loggedInUser.email}
            </h3>
            <h4>{loggedInUser.fullname}</h4>
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

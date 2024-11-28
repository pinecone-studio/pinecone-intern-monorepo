'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import { userContext } from '@/app/(main)/layout';
import { useCreateFollowersMutation, User } from '@/generated';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const UsersMap = () => {
  const { users, user }: any = useContext(userContext);
  const slicedUsers = Array.isArray(users) ? users.slice(0, 5) : [];

  const [createFollowers] = useCreateFollowersMutation();

  const handleFollow = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    await createFollowers({ variables: { followerId: user._id, followeeId: id } });
  };
  return (
    <div className="flex flex-col pt-4 gap-4">
      {slicedUsers.slice(0, 5).map((user: User, index: number) => (
        <Link href={`/profile?type=posts&username=${user?.username}`} key={index} className="rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.profilePicture} alt={user.username} className="object-cover" />
              <AvatarFallback className="uppercase text-[#ccc]">{user.username.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p data-testid="username" className="font-semibold">
                {user.username}
              </p>
            </div>
          </div>
          <Button className="text-sm p-0  text-[#2563EB] text-[14px]  hover:bg-white bg-white cursor-pointer" onClick={(e) => handleFollow(e, user._id)}>
            Follow
          </Button>
        </Link>
      ))}
    </div>
  );
};

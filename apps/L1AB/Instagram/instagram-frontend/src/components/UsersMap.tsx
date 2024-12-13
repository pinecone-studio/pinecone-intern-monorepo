'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserContext } from './providers';
import { useCreateFollowersMutation } from '@/generated';

export const UsersMap = () => {
  const [createFollowers] = useCreateFollowersMutation();
  const contextValue = useContext(UserContext);

  const { sortedUsers, user } = contextValue;

  const handleFollow = async (e: React.MouseEvent, followeeId: string) => {
    e.preventDefault();
    await createFollowers({ variables: { followerId: user._id, followeeId } });
  };

  return (
    <div className="flex flex-col pt-4 gap-4">
      {sortedUsers?.slice(0, 5).map((user: any) => (
        <Link href={`/profile?type=posts&username=${user.username}`} key={user._id} className="rounded flex items-center justify-between">
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
          <Button className="text-sm p-0 text-[#2563EB] text-[14px] hover:bg-white bg-white cursor-pointer" onClick={(e) => handleFollow(e, user._id)}>
            Follow
          </Button>
        </Link>
      ))}
    </div>
  );
};

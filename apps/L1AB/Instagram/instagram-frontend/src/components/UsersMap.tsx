'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserContext } from './providers';
import { useCreateFollowersMutation, useGetSuggestedUsersQuery } from '@/generated';
import * as _ from 'lodash';

export const UsersMap = () => {
  const contextValue = useContext(UserContext);
  const { user } = contextValue;
  const [createFollowers] = useCreateFollowersMutation();
  const { data } = useGetSuggestedUsersQuery({
    variables: { id: user ? user._id : '' },
  });

  const suggestions = useMemo(() => {
    if (!data) return [];

    const groupedData = _.groupBy(data.getSuggestedUsers, 'followeeId.username');

    return Object.values(groupedData);
  }, [data]);

  const sortedSuggestions = suggestions.sort((a, b) => b.length - a.length);

  const handleFollow = async (e: React.MouseEvent, followeeId: string) => {
    e.preventDefault();
    await createFollowers({ variables: { followerId: user._id, followeeId } });
  };

  return (
    <div className="flex flex-col pt-4 gap-4">
      {sortedSuggestions?.slice(0, 5).map((group: any, i) => (
        <Link href={`/profile?type=posts&username=${group[0].followeeId.username}`} key={group[0]._id} className="rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={group[0].followeeId.profilePicture} alt={group[0].followeeId.username} className="object-cover" />
              <AvatarFallback className="uppercase text-[#ccc]">{group[0].followeeId.username.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p data-testid="username" className="font-semibold">
                {group[0].followeeId.username}
              </p>
              <p className="text-[#71717A] text-[12px] flex">
                followed by {group[0].followerId.username}
                {group[1] && <div>, {group[1].followerId.username}</div>}
              </p>
            </div>
          </div>
          <Button data-testid={`follow-${i}`} className="text-sm p-0 text-[#2563EB] text-[14px] hover:bg-white bg-white cursor-pointer" onClick={(e) => handleFollow(e, group[0].followeeId._id)}>
            Follow
          </Button>
        </Link>
      ))}
    </div>
  );
};

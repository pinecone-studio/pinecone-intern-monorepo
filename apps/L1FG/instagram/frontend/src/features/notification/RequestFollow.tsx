'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationType, useAcceptRequstMutation, UserTogetherUserType } from '@/generated';
import Link from 'next/link';
import { FriendshipStatus } from '../home-post/FriendshipStatus';
import { useState } from 'react';

type Props = {
  reqNotification?: NotificationType[];
};

export const RequestFollow = ({ reqNotification }: Props) => {
  const [status, setStatus] = useState(true);
  const [acceptFollow] = useAcceptRequstMutation();

  const handleFollowConfirm = async (followerId: string) => {
    setStatus(false);
    await acceptFollow({
      variables: {
        followerId,
      },
    });
  };
  return (
    <div>
      {reqNotification?.map((n) => (
        <div key={n.id} className="flex items-center mt-4 h-[60px] py-2 px-6 mb-2">
          <Avatar>
            <AvatarImage src={n?.user?.profileImage} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className=" ml-[14px] text-sm break-words mr-2 ">
            <Link className="font-bold mr-1  text-base " href={'/'}>
              {'name'}
            </Link>
            requested to follow you
          </div>
          <FriendshipStatus statuss={status} onclick={() => handleFollowConfirm(n?.user?._id as string)} preview={n.user as UserTogetherUserType} />
        </div>
      ))}
    </div>
  );
};

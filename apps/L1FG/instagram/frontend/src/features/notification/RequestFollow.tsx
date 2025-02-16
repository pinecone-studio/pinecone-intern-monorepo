'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType, useAcceptRequestMutation, UserTogetherUserType } from '@/generated';
import Link from 'next/link';
import { FriendshipStatus } from '../home-post/FriendshipStatus';
import { useState } from 'react';

type Props = {
  reqNotification?: NotificationType[];
};

export const RequestFollow = ({ reqNotification }: Props) => {
  const [status, setStatus] = useState(true);
  const [acceptFollow] = useAcceptRequestMutation();

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
        <div key={n.id} className="flex justify-between items-center mt-4 h-[60px] py-2 px-6 mb-2">
          <div>
            <Avatar>
              <AvatarImage src={n?.user?.profileImage} alt="@shadcn" />
            </Avatar>
          </div>
          <div className="text-sm break-words mr-2 w-[187px]">
            <Link className="font-bold mr-1  text-base " href={'/'}>
              {n.user?.userName}
            </Link>
            {n.user?.friendshipStatus.incomingRequest && status ? <span> requested to follow you</span> : <span> started following you</span>}
          </div>
          <div>
            <FriendshipStatus
              requestStyle="flex gap-2"
              followingStyle="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md"
              followStyle="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md"
              requestedStyle="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md"
              statuss={status}
              onclick={() => handleFollowConfirm(n?.user?._id as string)}
              preview={n.user as UserTogetherUserType}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

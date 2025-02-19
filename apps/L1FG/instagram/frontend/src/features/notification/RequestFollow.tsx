'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType, useAcceptRequestMutation, UserTogetherUserType } from '@/generated';
import Link from 'next/link';
import { FriendshipStatus } from '../home-post/FriendshipStatus';
import { useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

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
        <div key={n.id} className="flex justify-between items-center mt-4 py-2 px-4 mb-2">
          <div className="mr-3">
            <Avatar>
              <AvatarImage src={n?.user?.profileImage} alt={n?.user?.userName || 'User'} />
            </Avatar>
          </div>

          <div className="text-sm flex-1">
            <Link className="font-bold text-sm block" href={`/${n?.user?._id}`}>
              {n.user?.userName}

              <span className="text-sm ">
                {n.user?.friendshipStatus.incomingRequest ? <span className="font-medium"> requested to follow you. </span> : <span className="font-normal"> started following you. </span>}
              </span>
              <span className="text-gray-400 text-xs">
                {n.createdAt
                  ? formatDistanceToNowStrict(new Date(n.createdAt), { addSuffix: false })
                      .replace(' seconds', 's')
                      .replace(' minutes', 'm')
                      .replace(' minute', 'm')
                      .replace(' hours', 'h')
                      .replace(' hour', 'h')
                      .replace(' days', 'd')
                      .replace(' day', 'd')
                      .replace(' weeks', 'w')
                      .replace(' week', 'w')
                      .replace(' months', 'mo')
                      .replace(' month', 'mo')
                      .replace(' years', 'y')
                      .replace(' year', 'y')
                  : 'Unknown time'}
              </span>
            </Link>
          </div>

          <div>
            <FriendshipStatus
              requestStyle="flex gap-2"
              followingStyle="bg-gray-200 h-[36px] w-[86px] rounded-md"
              followStyle="bg-blue-600 h-[36px] w-[86px] text-white rounded-md"
              requestedStyle="bg-gray-200 h-[36px] w-[86px] rounded-md"
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

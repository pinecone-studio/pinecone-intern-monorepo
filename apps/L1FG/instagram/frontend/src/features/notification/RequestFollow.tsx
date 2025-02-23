'use client';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { NotificationType, UserTogetherUserType } from '@/generated';
import Link from 'next/link';
import { FriendshipStatus } from '../home-post/FriendshipStatus';
import { formatDistanceToNowStrict } from 'date-fns';

type Props = {
  reqNotification?: NotificationType[];
};

export const RequestFollow = ({ reqNotification }: Props) => {
  return (
    <div>
      {reqNotification?.map((n) => (
        <div key={n.id} className="flex justify-between items-center mt-4 py-2 px-4 mb-2 hover:bg-accent">
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
              followingStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px] px-5 rounded-lg font-semibold text-sm"
              followStyle="bg-[#0095F6] hover:bg-[#2563EB] h-[36px] px-5 text-white rounded-lg font-semibold text-sm"
              requestedStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px] px-5 rounded-lg font-semibold text-sm"
              preview={n?.user as UserTogetherUserType}
              followerId={n?.user?._id as string}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

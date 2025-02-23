import { FriendshipStatusType, useUnfollowMutation } from '@/generated';
import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';
import { useCache } from '@/components/providers/CacheProvider';

export const Following = ({
  followingStyle,
  targetId,
  setStatus,
  followerCount,
}: {
  followerCount: number;
  followingStyle?: string;
  targetId: string;
  setStatus: React.Dispatch<React.SetStateAction<FriendshipStatusType>>;
}) => {
  const [unfollow] = useUnfollowMutation();
  const { cacheRemovefollow } = useCache();

  const handleClick = () => {
    unfollow({ variables: { followerId: targetId } });
    setStatus((pre) => ({ ...pre, following: false, outgoingRequest: false }));
    cacheRemovefollow({ followerId: targetId, followerCount: followerCount - 1 });
  };

  return (
    <button onClick={handleClick} className={cn(``, followingStyle)} data-testid="friendship-status-following">
      Following
    </button>
  );
};

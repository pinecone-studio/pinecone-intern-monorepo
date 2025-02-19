import { FriendshipStatusType, useUnfollowMutation } from '@/generated';
import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const Following = ({ followingStyle, targetId, setStatus }: { followingStyle?: string; targetId: string; setStatus: React.Dispatch<React.SetStateAction<FriendshipStatusType>> }) => {
  const [unfollow] = useUnfollowMutation();

  const handleClick = () => {
    unfollow({ variables: { followerId: targetId } });
    setStatus((pre) => ({ ...pre, following: false, outgoingRequest: false }));
  };

  return (
    <button onClick={handleClick} className={cn(``, followingStyle)} data-testid="friendship-status-following">
      Following
    </button>
  );
};

import { useUnfollowMutation } from '@/generated';
import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const Following = ({ followingStyle, targetId }: { followingStyle?: string; targetId: string }) => {
  const [unfollow] = useUnfollowMutation();

  const handleClick = () => {
    unfollow({ variables: { followerId: targetId } });
  };

  return (
    <button onClick={handleClick} className={cn(``, followingStyle)} data-testid="friendship-status-following">
      Following
    </button>
  );
};

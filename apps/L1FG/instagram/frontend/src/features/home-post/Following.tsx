import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const Following = ({ followingStyle }: { followingStyle?: string }) => {
  return (
    <button className={cn(``, followingStyle)} data-testid="friendship-status-following">
      Following
    </button>
  );
};

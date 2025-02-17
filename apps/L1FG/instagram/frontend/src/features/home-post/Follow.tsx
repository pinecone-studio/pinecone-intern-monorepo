import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const Follow = ({ handleClickLike, className, followStyle }: { handleClickLike: () => Promise<void>; className?: string; followStyle?: string }) => {
  return (
    <button
      className={cn(``, className, followStyle)}
      data-testid="friendship-status-follow"
      onClick={async () => {
        await handleClickLike();
      }}
    >
      Follow
    </button>
  );
};

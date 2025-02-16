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
// w-full h-[30px] bg-[#2563EB] text-white rounded-[6px]
//             flex justify-center items-center mt-2

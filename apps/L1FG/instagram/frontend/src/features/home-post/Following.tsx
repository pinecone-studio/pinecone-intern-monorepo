import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const Following = ({ followingStyle }: { followingStyle?: string }) => {
  return (
    <button className={cn(``, followingStyle)} data-testid="friendship-status-following">
      Following
    </button>
  );
};
// "w-full h-[30px] bg-[#2563EB] text-white rounded-[6px]
//             flex justify-center items-center mt-2

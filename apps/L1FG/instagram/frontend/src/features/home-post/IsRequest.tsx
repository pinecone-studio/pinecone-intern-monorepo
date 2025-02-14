import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const IsRequest = ({ onclick, requestStyle }: { onclick: () => void; requestStyle?: string }) => {
  return (
    <div className={cn(``, requestStyle)}>
      <button onClick={onclick} className="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md">
        Confirm
      </button>
      <button className="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md">Delete</button>
    </div>
  );
};
// flex gap-2

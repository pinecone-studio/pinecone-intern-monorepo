import { cn } from '../../../../../../../libs/shadcn/src/lib/utils';

export const IsRequest = ({ onclick, requestStyle }: { onclick: () => void; requestStyle?: string }) => {
  return (
    <div className={cn(``, requestStyle)}>
      <button onClick={onclick} className="bg-[#2563EB] py-[7px] px-4 text-white rounded-md">
        Confirm
      </button>
      <button className="bg-[#F4F4F5] py-[7px] px-4 rounded-md ">Delete</button>
    </div>
  );
};

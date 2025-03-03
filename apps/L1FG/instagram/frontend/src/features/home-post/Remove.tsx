import { cn } from '@/utils';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { GetUserTogetherQuery } from '@/generated';

export const Remove = ({ removeStyle, onclick, datas }: { onclick: () => void; removeStyle?: string; datas: GetUserTogetherQuery }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn(``, removeStyle)} data-testid="friendship-status-following ">
          Remove
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 ">
        <div className="flex flex-col ">
          <div className="flex flex-col items-center justify-center p-6 ">
            <div
              style={{ backgroundImage: `url(${datas?.getUserTogether?.user?.profileImage || './images/profilePic.png'})`, backgroundPosition: 'center' }}
              className=" bg-cover  w-[80px] h-[80px] object-cover rounded-full "
            ></div>
          </div>
          <div className="flex flex-col  pb-7">
            <p className="flex items-center justify-center text-2xl font-semibold">Remove follower?</p>
            <div className="flex flex-col ">
              <p className="flex items-center justify-center px-14 text-gray-500">Instagram won t tell {datas?.getUserTogether?.user?.userName} that they were removed </p>
              <p className="flex items-center justify-center px-14 text-gray-500">from your followers.</p>
            </div>
          </div>

          <p className="w-full border-b p-0 " />
          <p className="flex items-center justify-center text-red-600 cursor-pointer py-3 hover:bg-[#EFEFEF]" onClick={onclick}>
            Remove
          </p>
          <p className="w-full border-b" />
          <DialogClose>
            <p className="flex items-center justify-center py-3  cursor-pointer hover:bg-[#EFEFEF]">Cancel</p>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

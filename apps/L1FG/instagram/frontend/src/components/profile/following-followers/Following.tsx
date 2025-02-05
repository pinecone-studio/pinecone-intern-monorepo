import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useGetFollowingQuery } from '@/generated';
import { Search, X } from 'lucide-react';
import Image from 'next/image';

const Following = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
  const { data } = useGetFollowingQuery({
    variables: { searchingUserId: userId },
  });

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer" data-testid="following">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[400px] p-0 flex flex-col gap-2">
        <DialogHeader>
          <div className="flex justify-between items-center px-3">
            <div></div>
            <h3 className="flex justify-center font-semibold">Following</h3>
            <div className="flex justify-end">
              <DialogTrigger asChild>
                <div className="relative">
                  <p aria-label="Close dialog absolute">
                    <X className="cursor-pointer" />
                  </p>
                </div>
              </DialogTrigger>
            </div>
          </div>
        </DialogHeader>
        <Separator className="w-full" />
        <div className="flex justify-center px-3">
          <div className="items-center justify-center w-full relative">
            <Search className="absolute top-1.5 left-5 text-gray-500 h-5 w-5" />
            <input id="search" placeholder="Search" className="col-span-3 h-8 pl-12 outline-none rounded-lg bg-gray-100 w-full " />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-y-scroll">
          {data?.getFollowing?.map((item, index) => (
            <div key={index} className="flex justify-between ">
              <div className=" flex gap-4">
                <Image src={'/images/profilePic.png'} alt="zurag" width={50} height={50} className=" object-cover rounded-full bg-red-700" />
                <div>
                  <p className="text-sm font-semibold">{item?.targetId?.fullName}</p>
                  <p className="text-xs font-normal text-[#71717A]">{item?.targetId?.userName}</p>
                </div>
              </div>
              <div>
                <button className=" px-5 py-2 bg-slate-100 rounded-lg  font-semibold ">following</button>
              </div>
            </div>
          ))}
          <p className="font-semibold text-lg justify-start mt-6  p-3">Suggested for you</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Following;

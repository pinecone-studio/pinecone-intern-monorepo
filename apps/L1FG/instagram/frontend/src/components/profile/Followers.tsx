import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useGetFollowersQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';

const Followers = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
  const { data } = useGetFollowersQuery({
    variables: { searchingUserId: userId },
  });

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer" data-testid="followers">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[400px] p-0 flex flex-col gap-2">
        <DialogHeader>
          <div className="flex justify-between items-center px-3">
            <div></div>
            <h3 className="flex justify-center font-semibold ">Followers</h3>
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
            <Search className="absolute top-1 left-2 text-gray-500" />
            <Input id="search" placeholder="Search" className="col-span-3 h-8 pl-8  rounded-xl bg-gray-100" />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-y-scroll">
          {data?.getFollowers?.map((item, index) => (
            <div key={index} className="flex justify-between ">
              <div className=" flex gap-4">
                <Image src={'/images/profilePic.png'} alt="zurag" width={50} height={50} className=" object-cover rounded-full bg-red-700" />
                <div>
                  <p className="text-sm font-medium">{item?.followerId?.fullName}</p>
                  <p className="text-xs font-normal text-[#71717A]">{item?.followerId?.userName}</p>
                </div>
              </div>
              <button className=" px-5 py-2 bg-slate-100 rounded-lg  font-semibold ">Remove</button>
            </div>
          ))}
          <p className="font-semibold text-lg justify-start mt-6  p-3">Suggested for you</p>
        </div>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Followers;

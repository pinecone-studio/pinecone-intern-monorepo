import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useGetFollowersQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';
import { FriendshipStatus } from '@/features/home-post/FriendshipStatus';

const Followers = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
  const { data, loading } = useGetFollowersQuery({
    variables: { searchingUserId: userId },
  });
  if (loading) {
    return;
  }
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer" data-testid="following">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[400px] p-0 flex flex-col gap-2">
        <DialogHeader>
          <div className="flex justify-between items-center px-3 py-1">
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
          <div className="items-center justify-center w-full relative  ">
            <Search className="absolute top-1.5 left-3 text-gray-500 h-5 w-5" />
            <input id="search" placeholder="Search" className="  h-8 pl-9  bg-gray-100 outline-none w-full rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-y-scroll px-3 mt-2">
          {data?.getFollowers?.map((item) => (
            <div key={item.user._id} className="flex justify-between ">
              <div className=" flex gap-4">
                <Image src={'/images/profilePic.png'} alt="zurag" width={50} height={50} className=" object-cover rounded-full bg-red-700" />
                <div>
                  <p className="text-sm font-semibold">{item?.user?.userName}</p>
                  <p className="text-xs font-normal text-[#71717A]">{item?.user?.fullName}</p>
                </div>
              </div>
              {item.user && (
                <FriendshipStatus
                  preview={item.user}
                  requestStyle="flex gap-2"
                  followingStyle="bg-[#F4F4F5] h-[36px] px-5 rounded-lg font-semibold text-sm"
                  followStyle="bg-[#2563EB] h-[36px] px-5 text-white rounded-lg font-semibold text-sm"
                  requestedStyle="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md"
                />
              )}
            </div>
          ))}
          <p className="font-semibold text-lg justify-start mt-6  p-3">Suggested for you</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Followers;

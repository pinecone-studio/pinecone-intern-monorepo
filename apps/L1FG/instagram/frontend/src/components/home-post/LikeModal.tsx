import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useGetlikePostQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';
import { FriendshipStatusUser } from '@/features/home-post/FriendshipStatusUser';
import { ProfileHover } from '@/components/home-post/ProfileHover';

const LikeModal = ({ children, postId }: { children: React.ReactNode; postId: string }) => {
  const { data, loading } = useGetlikePostQuery({
    variables: { postId: postId },
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
            <h3 className="flex justify-center font-semibold">Likes</h3>
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

        <div className="flex flex-col gap-3 overflow-y-scroll px-3 mt-2">
          {data?.getlikePost?.map((item) => (
            <div key={item.user._id} className="flex justify-between ">
              <div className=" flex gap-4">
                <ProfileHover searchingUserId={item?.user?._id}>
                  <Image src={'/images/profilePic.png'} alt="zurag" width={50} height={50} className=" object-cover rounded-full bg-red-700" />
                </ProfileHover>
                <div>
                  <ProfileHover searchingUserId={item?.user?._id}>
                    <p className="text-sm font-semibold">{item.user.userName}</p>
                  </ProfileHover>
                  <p className="text-xs font-normal text-[#71717A]">{item?.user?.fullName}</p>
                </div>
              </div>
              {item.user && (
                <FriendshipStatusUser
                  preview={item.user}
                  requestStyle="flex gap-2"
                  removeStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px] px-5 rounded-lg font-semibold text-sm"
                  followStyle="bg-[#0095F6] hover:bg-[#2563EB] h-[36px] px-5 text-white rounded-lg font-semibold text-sm"
                  requestedStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px] w-[86px] rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LikeModal;

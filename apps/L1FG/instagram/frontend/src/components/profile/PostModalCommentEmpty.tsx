import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { UserPostType } from '@/generated';
import { Bookmark, Ellipsis, Heart, MessageCircle, Smile } from 'lucide-react';
import Image from 'next/image';

const PostModalCommentEmpty = ({ children, post }: { children: React.ReactNode; post: UserPostType }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="xl:max-w-[1100px] p-0 border-none rounded-none">
        <div className=" flex" data-testid="Post-Modal">
          <div className=" w-[55%] ">
            <Image src={post.postImage[0]} alt="Post" width={1200} height={900} className="w-full h-[700px]  object-cover" />
          </div>
          <div className="w-[45%]  flex flex-col justify-between">
            <div>
              <div className="flex justify-between py-3 px-5  items-center">
                <div className="flex gap-5 justify-center items-center">
                  <Image src="/images/profilePic.png" alt="zurag" width={35} height={35} className="w-[35px] rounded-full h-[35px] object-cover  bg-red-700" />
                  <p className="font-medium text-base">{post.user?.fullName}</p>
                </div>
                <div>
                  <Ellipsis />
                </div>
              </div>
              <Separator />
              <div className=" flex  px-5">
                <Image src="/images/profilePic.png" alt="zurag" width={35} height={35} className="w-[35px] rounded-full h-[35px] object-cover  bg-red-700" />
                <p>{post.commentCount}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 ">
              <Separator />
              <div className="flex justify-between pt-5 px-5 items-center ">
                <div className="flex gap-5 justify-center items-center">
                  <Heart className="hover:text-gray-400 cursor-pointer" />
                  <MessageCircle className="hover:text-gray-400 cursor-pointer" />
                </div>
                <div>
                  <Bookmark className="hover:text-gray-400 cursor-pointer" />
                </div>
              </div>
              <div className="flex gap-2  px-5">
                <p className="text-gray-500">Be the first to </p>
                <p className="hover:text-gray-400 cursor-pointer"> like this</p>
              </div>
              <Separator />
              <div className="flex justify-between py-1 px-5 ">
                <Smile />
                <p className="" placeholder=" Add a comment " />
                <p className="text-[#2563EB] cursor-pointer hover:text-black">Post</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PostModalCommentEmpty;

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { UserPostType } from '@/generated';
import { Bookmark, Ellipsis, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Carousel, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PostModalCarousel from './PostModalCarousel';
import CreateComment from './CreateComment';
import GetComments from './GetComments';

const PostModal = ({ children, post }: { children: React.ReactNode; post: UserPostType }) => {
  return (
    <Carousel>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="xl:max-w-[1100px] p-0 border-none rounded-none">
          <div className="flex">
            <div className="w-[55%]">
              <PostModalCarousel post={post as UserPostType} />
              <CarouselPrevious />
              <CarouselNext />
            </div>
            <div className="w-[45%] flex flex-col justify-between">
              <div>
                <div className="flex justify-between py-3 px-5 items-center">
                  <div className="flex gap-5 justify-center items-center">
                    <Image src="/images/profilePic.png" alt="zurag" width={35} height={35} className="w-[35px] rounded-full h-[35px] object-cover bg-red-700" />
                    <p className="font-medium text-base">{post.user?.fullName}</p>
                  </div>
                  <div>
                    <Ellipsis />
                  </div>
                </div>
                <Separator />
              </div>
              <GetComments postId={post._id as string} />
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold">No comments yet.</h3>
                <p>Start the conversation.</p>
              </div>

              <div className="flex flex-col gap-2">
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
                <div className="flex gap-2 px-5">
                  <p className="text-gray-500">Be the first to </p>
                  <p className="hover:text-gray-400 cursor-pointer">like this</p>
                </div>
                <Separator />
                <CreateComment postId={post._id as string} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Carousel>
  );
};

export default PostModal;

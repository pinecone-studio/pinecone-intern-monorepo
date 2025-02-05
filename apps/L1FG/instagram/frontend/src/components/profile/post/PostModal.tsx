'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { UserPostType } from '@/generated';
import { Ellipsis, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Carousel } from '@/components/ui/carousel';
import PostModalCarousel from './PostModalCarousel';
import GetComments from '../comment/GetComments';
import CreateComment from '../comment/CreateComment';

const PostModal = ({ children, post }: { children: React.ReactNode; post: UserPostType }) => {
  // const [liked, setLiked] = useState(false);
  // const [saved, setSaved] = useState(false);

  // const handleLike = () => {
  //   setLiked((prev) => !prev);
  // };

  // const handleSave = () => {
  //   setSaved((prev) => !prev);
  // };

  return (
    <Carousel>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="xl:max-w-[1100px] p-0 border-none rounded-none">
          <div className="flex">
            <div className="w-[55%] relative">
              <PostModalCarousel post={post as UserPostType} />
            </div>
            <div className="w-[45%] flex flex-col justify-between">
              <div>
                <div className="flex justify-between py-3 px-6 items-center">
                  <div className="flex gap-5 items-center">
                    <Image src="/images/profilePic.png" alt="User profile picture" width={35} height={35} className="w-[35px] rounded-full h-[35px] object-cover" />
                    <p className="font-semibold text-base">{post.user?.userName}</p>
                  </div>
                  <Ellipsis className="cursor-pointer" aria-label="More options" />
                </div>
                <Separator />
              </div>

              {post?.commentCount ? (
                <GetComments postId={post._id as string} />
              ) : (
                <div className="flex flex-col justify-center items-center py-4">
                  <h3 className="text-2xl font-bold">No comments yet.</h3>
                  <p>Start the conversation.</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Separator />
                <div className="flex justify-between pt-5 px-5 items-center">
                  <div className="flex gap-5 items-center">
                    {/* <Heart className="hover:text-gray-400 cursor-pointer" style={{ fill: liked ? 'red' : 'white' }} onClick={handleLike} aria-label="Like post" /> */}
                    <MessageCircle className="hover:text-gray-400 cursor-pointer" />
                  </div>
                  {/* <Bookmark className="cursor-pointer hover:text-gray-400" style={{ fill: saved ? 'black' : 'white' }} onClick={handleSave} aria-label="Save post" /> */}
                </div>
                <div className="flex gap-2 px-5">
                  <p className="text-gray-500">Be the first to</p>
                  {/* <p className={`cursor-pointer ${liked ? 'hidden' : 'hover:text-gray-400'}`} onClick={handleLike}>
                    like this
                  </p> */}
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

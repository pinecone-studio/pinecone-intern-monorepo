import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { UserPostType } from '@/generated';
import Image from 'next/image';
import { Carousel } from '@/components/ui/carousel';
import PostModalCarousel from './PostModalCarousel';
import GetComments from '../../../features/profile/comment/GetComments';
import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';
import { ProfileHover } from '@/features/home-post/ProfileHover';
import DeletePost from '@/features/profile/DeletePost';
import { PostLikeModal } from '@/features/profile/PostLIkeModal';
import { useState } from 'react';

const PostModal = ({ children, post }: { children: React.ReactNode; post: UserPostType }) => {
  const [postOpen, setPostOpen] = useState(false);

  return (
    <Carousel>
      <Dialog onOpenChange={setPostOpen} open={postOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="xl:max-w-[1200px] p-0 border-none rounded-none">
          <div className=" flex">
            <div className=" w-[60%] ">
              <PostModalCarousel post={post as UserPostType} />
            </div>
            <div className="w-[40%] flex flex-col justify-between ">
              <div>
                <div className="flex justify-between py-3 px-6 items-center">
                  <div className="flex gap-5 justify-center items-center">
                    <ProfileHover searchingUserId={post?.user?._id}>
                      <Image src={imageUrlOptimizer(post.user?.profileImage)} alt="zurag" width={35} height={35} className="w-[40px] rounded-full h-[40px] object-cover border" />
                    </ProfileHover>
                    <ProfileHover searchingUserId={post.user._id}>
                      <p className="font-semibold text-base">{post.user?.userName}</p>
                    </ProfileHover>
                  </div>
                  <div>
                    <DeletePost setPostOpen={setPostOpen} postId={post._id} />
                  </div>
                </div>
                <Separator />
              </div>

              {post.commentCount || post.caption ? (
                <div className="p-6 flex flex-col gap-6 h-[488px] overflow-y-scroll">
                  <div className="flex  ">
                    <ProfileHover searchingUserId={post.user._id}>
                      <Image src={imageUrlOptimizer(post.user.profileImage)} width={35} height={35} alt="User profile" className="rounded-full w-[40px] h-[40px] border" />
                    </ProfileHover>

                    <div className="flex flex-col gap-2">
                      <div className=" flex">
                        <ProfileHover searchingUserId={post.user._id}>
                          <p className="font-semibold  ml-5"> {post.user.userName}</p>
                        </ProfileHover>
                        <p className="ml-2 text-sm">{post.caption}</p>
                      </div>
                      <div className="flex ml-5 gap-4">
                        <p className="text-xs text-gray-500">22 h</p>
                      </div>
                    </div>
                  </div>

                  <GetComments post={post} />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h3 className="text-2xl font-bold">No comments yet.</h3>
                  <p>Start the conversation.</p>
                </div>
              )}
              <PostLikeModal post={post} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Carousel>
  );
};

export default PostModal;

import Image from 'next/image';
import { useGetPostsQuery } from '@/generated';

import Message from '../svg/Message';
import Heart from '../svg/Heart';
import PostModal from './PostModal';

const Post = ({ userId }: { userId: string }) => {
  const { data } = useGetPostsQuery({
    variables: { searchingUserId: userId },
  });

  return (
    <div className="flex flex-col gap-5 w-[900x] mt-5" data-testid="profile-posts">
      <div>
        <div className="grid grid-cols-3 gap-1 overflow-y-scroll">
          {data?.getPosts?.map((post) => {
            if (!post?.postImage.length || !post?.postImage[0]) {
              return null;
            }
            return (
              <PostModal post={post} key={post._id}>
                <div className="relative flex flex-col items-center justify-center border group cursor-pointer">
                  <Image src={post?.postImage[0]} alt="profile" className="object-cover w-[300px] h-[300px] group-hover:opacity-90   transition-opacity duration-300" width={309} height={309} />

                  <div className="absolute flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-[300px] bg-black/50">
                    <div className="flex gap-2 justify-center items-center">
                      <Heart />
                      <p className="text-white font-bold text-lg">{post.likeCount}</p>
                    </div>

                    <div className="flex gap-2 justify-center items-center">
                      <Message />
                      <p className="text-white font-bold text-lg">{post.commentCount}</p>
                    </div>
                  </div>
                </div>
              </PostModal>
            );
          })}
        </div>

        <div className="text-gray-500 text-center text-[12px] flex flex-col gap-4 mt-8">
          <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
          <p>© 2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

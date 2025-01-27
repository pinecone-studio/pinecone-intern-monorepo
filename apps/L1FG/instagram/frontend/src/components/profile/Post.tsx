import Image from 'next/image';
import Posts from '../svg/Posts';
import Saved from '../svg/Saved';
import { Separator } from '@/components/ui/separator';
import { useGetPostsQuery } from '@/generated';

const Post = ({ userId }: { userId: string }) => {
  const { data } = useGetPostsQuery({
    variables: { searchingUserId: userId },
  });

  return (
    <div className="flex flex-col gap-5 w-[900px]" data-testid="profile-posts">
      <Separator />

      <div className="flex justify-center gap-6">
        <div className="flex justify-center items-center gap-2">
          <Posts />
          <p className="text-xs font-medium text-[#09090B]">POSTS</p>
        </div>
        <div className="flex justify-center items-center gap-1">
          <Saved />
          <p className="text-xs font-medium text-[#09090B]">SAVED</p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-1 overflow-y-scroll">
          {data?.getPosts?.map((post) => {
            if (!post?.postImage.length || !post?.postImage[0]) {
              return null;
            }
            return (
              <div key={post._id} className="flex flex-col items-center justify-center border  ">
                <Image
                  src={post?.postImage[0]}
                  alt="profile"
                  className=" object-cover opacity-100 hover:opacity-30 transition-opacity duration-300"
                  sizes="(max-width: 309px) 100vw, 309px"
                  width={200}
                  height={300}
                />
              </div>
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

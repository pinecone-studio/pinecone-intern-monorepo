import Image from 'next/image';
import { useGetPostsQuery } from '@/generated';

const Post = ({ userId }: { userId: string }) => {
  const { data } = useGetPostsQuery({
    variables: { searchingUserId: userId },
  });
  console.log('POST DATA:', data);

  return (
    <div className="flex flex-col gap-5 w-[935px]" data-testid="profile-posts">
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
                  className=" object-fill opacity-100  w-[309px] h-[309px] hover:opacity-30 transition-opacity duration-300  "
                  sizes="(max-width: 309px) 100vw, 309px"
                  width={309}
                  height={309}
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

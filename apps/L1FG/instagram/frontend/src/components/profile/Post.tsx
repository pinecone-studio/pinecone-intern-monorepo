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
        <div className="flex justify-center items-center gap-2 ">
          <Posts />
          <p className="text-xs font-medium tex-[#09090B]">POSTS</p>
        </div>
        <div className="flex justify-center items-center gap-1 ">
          <Saved />
          <p className="text-xs font-medium tex-[#09090B]">SAVED</p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-1 overflow-y-scroll ">
          {data?.getPosts?.map((post, index) => (
            <div key={index} className="flex flex-col items-center justify-center border p-2">
              <img src={post?.postImage[0]} alt={'profile'} className="w-[200px] h-[300px] object-top " />
            </div>
          ))}
        </div>
        <div className="text-gray-500 text-wrap text-[12px] flex flex-col gap-4 mt-8 ">
          <p className="flex justify-center">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
          <p className="flex justify-center">© 2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

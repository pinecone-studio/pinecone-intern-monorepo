import Image from 'next/image';
import { useGetPostsQuery } from '@/generated';
import PostModal from './PostModal';
import Message from '@/components/svg/Message';
import Heart from '@/components/svg/Heart';
import SkeletonPost from './SkeletonPost';

const Post = ({ userId }: { userId: string }) => {
  const { data, loading } = useGetPostsQuery({
    variables: {
      input: {
        searchingUserId: userId,
        after: '',
        first: 3,
      },
    },
  });

  return (
    <div className="flex flex-col gap-5 w-[900px] mt-5" data-testid="profile-posts">
      <div>
        {loading ? (
          <div className="grid grid-cols-3 gap-1">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 overflow-y-scroll">
            {data?.getPosts.edges.map((edge) => {
              if (!edge.node.postImage.length || !edge.node.postImage[0]) {
                return null;
              }
              return (
                <PostModal post={edge.node} key={edge.node._id}>
                  <div className="relative flex flex-col items-center justify-center group cursor-pointer">
                    <Image src={edge.node.postImage[0]} alt="profile" className="object-cover w-[300px] h-[300px] group-hover:opacity-90 transition-opacity duration-300" width={300} height={300} />
                    <div className="absolute flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full bg-black/50">
                      <div className="flex gap-2 justify-center items-center">
                        <Heart />
                        <p className="text-white font-bold text-lg">{edge.node.likeCount}</p>
                      </div>
                      <div className="flex gap-2 justify-center items-center">
                        <Message />
                        <p className="text-white font-bold text-lg">{edge.node.commentCount}</p>
                      </div>
                    </div>
                  </div>
                </PostModal>
              );
            })}
          </div>
        )}

        <div className="text-gray-500 text-center text-[12px] flex flex-col gap-4 mt-8">
          <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
          <p>© 2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

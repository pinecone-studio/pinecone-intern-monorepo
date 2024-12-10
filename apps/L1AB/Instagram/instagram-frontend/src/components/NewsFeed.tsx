'use client';
import { useGetPostsByFollowersIdQuery } from '@/generated';
import PostCard from './PostCard';
import { UserContext } from './providers';
import { useContext } from 'react';
import Loading from './Loading';

const NewsFeed = () => {
  const { user }: any = useContext(UserContext);

  const { data, loading } = useGetPostsByFollowersIdQuery({
    variables: {
      followerId: user ? user._id : '',
    },
  });

  if (loading) return <Loading size={30} />;
  const posts = data?.getPostsByFollowersId;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {posts?.map((post, i) => {
          return <PostCard postId={post._id} keyy={i} profilePicture={post.userId.profilePicture} images={post.images} caption={post.caption} userName={post.userId.username} key={i} />;
        })}
      </div>
    </div>
  );
};
export default NewsFeed;

'use client';
import { useDeletePostMutation, useGetPostsByFollowersIdQuery } from '@/generated';
import PostCard from './PostCard';
import { UserContext } from './providers';
import { useContext } from 'react';
import Loading from './Loading';

const NewsFeed = () => {
  const { user }: any = useContext(UserContext);
  const { data, loading, refetch } = useGetPostsByFollowersIdQuery({
    variables: {
      followerId: user ? user._id : '',
    },
  });

  const [deletePost] = useDeletePostMutation();
  const posts = data?.getPostsByFollowersId;
  console.log(posts);

  const handleDeletePost = async (id: string) => {
    await deletePost({ variables: { id: id } });
    refetch();
  };
  if (loading) return <Loading size={30} />;

  return (
    <div>
      <div className="flex flex-col gap-2 2xl:pl-[500px] xl:pl-[300px] dark:text-gray-300">
        {posts?.map((post, i) => {
          return (
            <PostCard
              deletePost={handleDeletePost}
              postOwnerId={post.userId._id}
              createdAt={post.createdAt}
              postId={post._id}
              profilePicture={post.userId.profilePicture}
              images={post.images}
              caption={post.caption}
              userName={post.userId.username}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};
export default NewsFeed;

'use client';
import { useDeletePostMutation, useGetPostsByFollowersIdQuery } from '@/generated';
import PostCard from './PostCard';
import { UserContext } from './providers';
import { useContext, useEffect, useState } from 'react';
import Loading from './Loading';
type newPostType = {
  _id: string;
  userId: {
    username: string;
    _id: string;
    profilePicture: string;
  };
  images: string[];
  caption: string;
  createdAt: string;
  updatedAt: string;
};
const NewsFeed = () => {
  const [newPosts, setNewPosts] = useState<newPostType[]>();
  const { user }: any = useContext(UserContext);
  const { data, loading } = useGetPostsByFollowersIdQuery({
    variables: {
      followerId: user ? user._id : '',
    },
  });
  const [deletePost] = useDeletePostMutation();
  const posts = data?.getPostsByFollowersId;

  useEffect(() => {
    const postsFromStorage = JSON.parse(localStorage.getItem('new posts') ?? '[]');

    if (postsFromStorage) {
      const rev = postsFromStorage.reverse();
      setNewPosts(rev);
    }
    return;
  }, []);
  if (loading) return <Loading size={30} />;

  const handleDeletePost = (id: string) => {
    const updatedPosts = newPosts?.filter((post: any) => post._id !== id);
    setNewPosts(updatedPosts);
    localStorage.setItem('new posts', JSON.stringify(updatedPosts));
    deletePost({ variables: { id: id } });
  };

  return (
    <div>
      <div className="flex flex-col gap-2  ${selected === 'profile' ? 'text-white bg-[#131313]' : 'dark:text-gray-300 text-black'}">
        {newPosts?.map((post, i) => {
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

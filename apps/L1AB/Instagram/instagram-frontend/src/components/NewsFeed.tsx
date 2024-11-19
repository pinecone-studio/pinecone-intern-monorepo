import { useGetAllPostsQuery } from '@/generated';
import PostCard from './PostCard';

const NewsFeed = () => {
  const { data } = useGetAllPostsQuery();
  const posts = data?.getAllPosts;
  console.log(posts);

  return (
    <div>
      <div className="flex flex-col gap-2">
        {posts?.map((post, i) => {
          return <PostCard keyy={i} profilePicture={post.userId.profilePicture} images={post.images} caption={post.caption} userName={post.userId.username} likeCount={post.likeCounts} key={i} />;
        })}
      </div>
    </div>
  );
};
export default NewsFeed;

import { useGetAllPostsQuery } from '@/generated';
import PostCard from './PostCard';

const NewsFeed = () => {
  const { data } = useGetAllPostsQuery();
  const posts = data?.getAllPosts;

  return (
    <div>
      <div className="flex flex-col gap-2">
        {posts?.map((post, i) => {
          return (
            <PostCard
              profilePicture={post.userId.profilePicture}
              images={post.images}
              caption={post.caption}
              userName={post.userId.username}
              likeCount={post.likeCounts}
              data-testid="NewsFeed-PostCard"
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};
export default NewsFeed;

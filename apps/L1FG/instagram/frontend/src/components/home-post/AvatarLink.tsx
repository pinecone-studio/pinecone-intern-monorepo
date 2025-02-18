import { PostsEdge } from '@/generated';
import { Avatar } from './Avatar';
import { ProfileOrStory } from './ProfileOrStory';
export const AvatarLink = ({ post }: { post: PostsEdge }) => {
  const hasStoryToSee = post?.node?.user?.latestStoryTimestamp > post?.node?.user?.seenStoryTime;
  const image = post?.node?.user?.profileImage;
  return (
    <ProfileOrStory hasStory={hasStoryToSee} urlWhenHasStory={`/stories/${post?.node?.user?.userName}/${post?.node?.user?._id} `} urlWhenNoStory={`/${post?.node?.user?._id}`}>
      <Avatar hasStoryToSee={hasStoryToSee} image={image} />
    </ProfileOrStory>
  );
};

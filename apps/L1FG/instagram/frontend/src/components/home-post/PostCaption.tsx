import { ProfileHover } from '@/features/home-post/ProfileHover';
import { PostsEdge } from '@/generated';

export const PostCaption = ({ post }: { post: PostsEdge }) => {
  return (
    <div data-testid="post-description">
      <h1 className="text-base font-normal">
        <div className="pr-1 font-bold text-black cursor-pointer" data-testid="post-username">
          <ProfileHover searchingUserId={post.node.user._id}>{post.node?.user?.userName}</ProfileHover>
        </div>

        {post.node?.caption}
      </h1>
    </div>
  );
};

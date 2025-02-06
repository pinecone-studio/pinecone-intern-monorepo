import { PostsEdge } from '@/generated';

export const PostCaption = ({ post }: { post: PostsEdge }) => {
  return (
    <div data-testid="post-description">
      <h1 className="text-base font-normal">
        <span className="pr-1 font-bold text-black" data-testid="post-username">
          {post.node?.user?.userName}
        </span>
        {post.node?.caption}
      </h1>
    </div>
  );
};

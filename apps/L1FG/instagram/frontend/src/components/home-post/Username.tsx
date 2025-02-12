import { PostsEdge } from '@/generated';

export const Username = ({ post }: { post: PostsEdge }) => {
  return <div className="pr-1 font-semibold text-sm text-black flex items-center hover:cursor-pointer">{post.node?.user?.userName}</div>;
};

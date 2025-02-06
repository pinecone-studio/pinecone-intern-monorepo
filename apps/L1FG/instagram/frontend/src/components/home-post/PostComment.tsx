import { PostsEdge } from '@/generated';
import { commentText } from '../utils/comment-text';

export const PostComment = ({ post }: { post: PostsEdge }) => {
  return (
    <div className="text-gray-500">
      <p data-testid="comment">{commentText(post.node.commentCount)}</p>
      <p className="cursor-pointer" data-testid="add-comment">
        Add a comment
      </p>
    </div>
  );
};

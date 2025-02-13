import { PostsEdge } from '@/generated';
import { quantityConverter } from '../utils/quantity-converter';

export const PostComment = ({ post }: { post: PostsEdge }) => {
  return (
    <div className="text-gray-500">
      <p data-testid="comment">{quantityConverter({ quantity: post.node.commentCount, text: 'comment' })}</p>
      <p className="cursor-pointer" data-testid="add-comment">
        Add a comment
      </p>
    </div>
  );
};

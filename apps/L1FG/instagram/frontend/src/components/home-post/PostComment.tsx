import { PostsEdge } from '@/generated';
import { quantityConverter } from '../utils/quantity-converter';
import HomePostCreateComment from '@/features/home-post/HomePostCreateComment';

export const PostComment = ({ post }: { post: PostsEdge }) => {
  return (
    <div>
      <p data-testid="comment">{quantityConverter({ quantity: post.node.commentCount, text: 'comment' })}</p>
      <p className="cursor-pointer" data-testid="add-comment">
        <HomePostCreateComment post={post.node} />
      </p>
    </div>
  );
};

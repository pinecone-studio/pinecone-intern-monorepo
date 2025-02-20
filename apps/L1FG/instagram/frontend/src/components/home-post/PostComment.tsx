import { PostsEdge } from '@/generated';
import { quantityConverter } from '../utils/quantity-converter';
import HomePostCreateComment from '@/features/home-post/HomePostCreateComment';
import PostModal from '../profile/profilePost/PostModal';

export const PostComment = ({ post }: { post: PostsEdge }) => {
  return (
    <div>
      <PostModal post={post.node}>
        <p data-testid="comment" className="hover:cursor-pointer">
          {quantityConverter({ quantity: post.node.commentCount, text: 'comment' })}
        </p>
      </PostModal>
      <p className="cursor-pointer" data-testid="add-comment">
        <HomePostCreateComment post={post.node} />
      </p>
    </div>
  );
};

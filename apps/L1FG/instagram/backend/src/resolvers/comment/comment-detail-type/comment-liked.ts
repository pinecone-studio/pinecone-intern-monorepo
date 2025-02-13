import { CommentLikeModel } from '../../../models';
import { authenticate } from '../../../utils/authenticate';

export const commentLiked = async ({ _id }: { _id: string }, _: unknown, { userId }: { userId: string | null }) => {
  authenticate(userId);
  const commentLiked = await CommentLikeModel.findOne({
    userId: userId,
    commentId: _id,
  });

  const hasLiked = commentLiked ? true : false;
  return hasLiked;
};

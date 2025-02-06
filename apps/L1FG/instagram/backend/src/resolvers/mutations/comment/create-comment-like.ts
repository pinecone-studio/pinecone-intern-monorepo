import { MutationResolvers } from '../../../generated';
import { CommentLikeModel } from '../../../models';
import { CommentModel } from '../../../models/comment.model';
import { CreationError } from '../../../utils/error';

export const createCommentLike: MutationResolvers['createCommentLike'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { commentId } = input;
  const commentLike = await CommentLikeModel.create({
    userId,
    commentId,
  });
  if (!commentLike) throw new CreationError('Failed comment');
  const updatedCommentLike = await CommentModel.findByIdAndUpdate(commentId, { $inc: { likeCount: 1 } }, { new: true });
  if (!updatedCommentLike) {
    await CommentLikeModel.findByIdAndDelete(commentLike._id);
    throw new CreationError('failed comment');
  }
  return commentLike;
};

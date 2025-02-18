import { QueryResolvers } from '../../../generated';
import { CommentLikeModel } from '../../../models';

export const getCommentLikedPeople: QueryResolvers['getCommentLikedPeople'] = async (_, { commentId }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');

  const commentLikes = await CommentLikeModel.find({ commentId });
  return commentLikes;
};

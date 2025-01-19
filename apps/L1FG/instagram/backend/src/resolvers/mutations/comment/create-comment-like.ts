import { MutationResolvers } from '../../../generated';
import { CommentLikeModel } from '../../../models';

export const createCommentLike: MutationResolvers['createCommentLike'] = async (_, { input }, { userId }) => {
  console.log('userId:', userId);
  if (!userId) throw new Error('Unauthorized');
  const { commentId } = input;
  const commentLike = await CommentLikeModel.create({
    userId,
    commentId,
  });

  return commentLike;
};

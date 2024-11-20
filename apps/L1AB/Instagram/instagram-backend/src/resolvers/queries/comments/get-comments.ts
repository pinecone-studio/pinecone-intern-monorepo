import { QueryResolvers } from '../../../generated';
import { commentsModel, CommentsPopulatedType } from '../../../models';

export const getCommentsByPostId: QueryResolvers['getCommentsByPostId'] = async (_: unknown, { postId }) => {
  const comments = await commentsModel.find({postId}).populate<CommentsPopulatedType>(['userId', 'postId'])

  if (!comments.length) {
    throw new Error('No comments found for this post.');
  }
  
  return comments.map(comment => comment.toObject());
};
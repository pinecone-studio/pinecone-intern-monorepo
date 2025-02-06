import { QueryResolvers } from '../../../generated';
import { CommentModel } from '../../../models/comment.model';
import { authenticate } from '../../../utils/authenticate';

export const getComments: QueryResolvers['getComments'] = async (_, { input }, { userId }) => {
  const { postId } = input;
  authenticate(userId);
  if (!postId) throw new Error('Unauthorized');
  const comments = await CommentModel.find({ postId: postId });
  return comments;
};

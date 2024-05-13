import { errorTypes, graphqlErrorHandler } from '../../error';
import { QueryResolvers, CommentStatus } from '@/graphql/generated/index';
import { CommentsModel } from '../../../../models/comment.model';

export const getCommentsByArticleId: QueryResolvers['getCommentsByArticleId'] = async (_, { articleId }) => {
  try {
    const comments = await CommentsModel.find({ articleId, status: CommentStatus.Normal });
    return comments;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot delete comment` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

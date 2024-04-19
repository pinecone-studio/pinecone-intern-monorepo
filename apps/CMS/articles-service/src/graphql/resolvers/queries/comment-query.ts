import { CommentModel } from '../../../models/comment.model';
import { QueryResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../error';

export const getCommentsByArticleId: QueryResolvers['getCommentsByArticleId'] = async (_, { articleId }) => {
  try {
    const comments = await CommentModel.find({ articleId: articleId });

    return comments;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'Failed to fetch comments by article ID' }, errorTypes.BAD_REQUEST);
  }
};

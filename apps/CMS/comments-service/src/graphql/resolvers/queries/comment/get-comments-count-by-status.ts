import { QueryResolvers } from '@/graphql/generated';
import { CommentsModel } from '@/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '../../error';

export const getCommentsCountByStatus: QueryResolvers['getCommentsCountByStatus'] = async (_, { status }) => {
  try {
    const count = await CommentsModel.countDocuments({ status });
    return { count };
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot get comments count by status` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

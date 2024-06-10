import { QueryResolvers } from '@/graphql/generated';
import { CommentsModel } from '@/models/comment.model';
import { errorTypes, graphqlErrorHandler } from '../../error';

export const getCommentsCount: QueryResolvers['getCommentsCount'] = async () => {
  try {
    const normalCount = await CommentsModel.countDocuments({ status: 'NORMAL' });
    const hiddenCount = await CommentsModel.countDocuments({ status: 'HIDDEN' });
    const deletedCount = await CommentsModel.countDocuments({ status: 'DELETED' });
    return { normalCount, hiddenCount, deletedCount };
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot get comments count by status` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

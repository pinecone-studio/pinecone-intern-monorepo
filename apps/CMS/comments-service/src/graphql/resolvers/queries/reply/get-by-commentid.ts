import { errorTypes, graphqlErrorHandler } from '../../error';
import { QueryResolvers } from '../../../generated/index';
import ReplyModel from '../../../../models/reply.model';
export const getRepliesByCommentId: QueryResolvers['getRepliesByCommentId'] = async (_, { commentId }) => {
  try {
    const replies = await ReplyModel.find({ commentId });
    return replies;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'cannot get replies by commentId' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

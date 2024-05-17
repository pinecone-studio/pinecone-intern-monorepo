import { errorTypes, graphqlErrorHandler } from '../../error';
import { QueryResolvers } from '@/graphql/generated/index';
import ReplyModel from '@/models/reply.model';
export const getRepliesByParentId: QueryResolvers['getRepliesByParentId'] = async (_, { parentId }) => {
  try {
    const replies = await ReplyModel.find({ parentId });
    return replies;
  } catch (error) {
    throw graphqlErrorHandler({ message: 'cannot get replies by parentId' }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

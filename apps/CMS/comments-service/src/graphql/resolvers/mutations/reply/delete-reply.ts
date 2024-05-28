import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../../error';
import ReplyModel from '@/models/reply.model';
import { accessTokenAuth } from '@/middlewares/auth-token';

export const deleteReply: MutationResolvers['deleteReply'] = async (_, { deleteInput }, { req }) => {
  await accessTokenAuth(req);
  try {
    const deletedReply = await ReplyModel.findByIdAndDelete(deleteInput._id);
    return deletedReply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot delete reply` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

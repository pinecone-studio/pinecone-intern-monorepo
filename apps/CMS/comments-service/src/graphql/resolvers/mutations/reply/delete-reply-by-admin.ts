import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../../error';
import ReplyModel from '@/models/reply.model';

export const deleteReplyByAdmin: MutationResolvers['deleteReplyByAdmin'] = async (_, { id }) => {
  try {
    const deletedComment = await ReplyModel.findByIdAndUpdate(id, { status: 'DELETED' });
    return deletedComment._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot remove reply by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

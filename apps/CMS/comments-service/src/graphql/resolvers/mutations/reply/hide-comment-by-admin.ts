import { MutationResolvers } from '@/graphql/generated';
import { errorTypes, graphqlErrorHandler } from '../../error';
import ReplyModel from '@/models/reply.model';

export const hideReplyByAdmin: MutationResolvers['hideReplyByAdmin'] = async (_, { hideInput }) => {
  try {
    const hiddenReply = await ReplyModel.findByIdAndUpdate(hideInput._id, { status: 'HIDDEN' });
    return hiddenReply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot hide reply by admin` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

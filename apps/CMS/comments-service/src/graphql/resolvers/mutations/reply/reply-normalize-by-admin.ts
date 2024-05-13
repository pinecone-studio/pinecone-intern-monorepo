import { errorTypes, graphqlErrorHandler } from '../../error';
import { MutationResolvers, ReplyStatus } from '@/graphql/generated/index';
import ReplyModel from '@/models/reply.model';

export const setReplyStatusToNormal: MutationResolvers['setReplyStatusToNormal'] = async (_, { id }) => {
  try {
    const reply = await ReplyModel.findByIdAndUpdate(id, { status: ReplyStatus.Normal });
    return reply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot convert reply status to normal` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

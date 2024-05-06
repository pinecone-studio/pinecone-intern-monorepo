import { errorTypes, graphqlErrorHandler } from '../../error';
import { MutationResolvers } from '../../../generated';
import ReplyModel from '../../../../models/reply.model';

export const setReplyStatusToNormal: MutationResolvers['setReplyStatusToNormal'] = async (_, { setReplyStatusInput }) => {
  try {
    const reply = await ReplyModel.findByIdAndUpdate(setReplyStatusInput._id, { status: 'NORMAL' });
    return reply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot convert reply status to normal` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

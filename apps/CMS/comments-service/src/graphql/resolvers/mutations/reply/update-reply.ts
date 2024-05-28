import { MutationResolvers } from '@/graphql/generated';
import ReplyModel from '@/models/reply.model';
import { errorTypes, graphqlErrorHandler } from '../../error';

export const updateReply: MutationResolvers['updateReply'] = async (_, { updateInput }) => {
  const { _id, name, email, reply } = updateInput;
  try {
    const updatedReply = await ReplyModel.findByIdAndUpdate(_id, { name, email, reply });
    return updatedReply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot update reply` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

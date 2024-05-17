import { MutationResolvers } from '@/graphql/generated/index';
import { errorTypes, graphqlErrorHandler } from '../../error';
import ReplyModel from '@/models/reply.model';

export const publishReply: MutationResolvers['publishReply'] = async (_, { createInput }) => {
  try {
    const createdReply = await ReplyModel.create(createInput);
    return createdReply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot create reply` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

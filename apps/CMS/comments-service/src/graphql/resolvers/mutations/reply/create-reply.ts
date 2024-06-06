import { MutationResolvers } from '@/graphql/generated/index';
import { errorTypes, graphqlErrorHandler } from '../../error';
import ReplyModel from '@/models/reply.model';
import { filterWords } from '@/middlewares/filter-words';

export const publishReply: MutationResolvers['publishReply'] = async (_, { createInput }) => {
  const { commentId, parentId, reply, name, email } = createInput;
  const filteredReply = await filterWords(reply);
  try {
    const createdReply = await ReplyModel.create({ reply: filteredReply, parentId, name, email, commentId });
    return createdReply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot create reply` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

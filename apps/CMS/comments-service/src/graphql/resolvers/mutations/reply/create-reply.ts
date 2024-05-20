import { MutationResolvers } from '@/graphql/generated/index';
import { errorTypes, graphqlErrorHandler } from '../../error';
import ReplyModel from '@/models/reply.model';
import { filterWords } from '@/middlewares/filter-words';

export const publishReply: MutationResolvers['publishReply'] = async (_, { createInput }) => {
  const { reply, commentId, parentId, name, email } = createInput;
  const filteredReply = await filterWords(reply);
  try {
    const createdReply = await ReplyModel.create({ reply: filteredReply, commentId, parentId, name, email });
    return createdReply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot create reply` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

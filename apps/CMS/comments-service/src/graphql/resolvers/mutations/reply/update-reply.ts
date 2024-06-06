import { MutationResolvers } from '@/graphql/generated';
import ReplyModel from '@/models/reply.model';
import { errorTypes, graphqlErrorHandler } from '../../error';
import { accessTokenAuth } from '@/middlewares/auth-token';
import { filterWords } from '@/middlewares/filter-words';

export const updateReply: MutationResolvers['updateReply'] = async (_, { updateInput }, { req }) => {
  await accessTokenAuth(req);
  const { _id, name, email, reply } = updateInput;
  const filteredReply = await filterWords(reply);
  try {
    const updatedReply = await ReplyModel.findByIdAndUpdate(_id, { name, email, reply: filteredReply });
    return updatedReply._id;
  } catch (error) {
    throw graphqlErrorHandler({ message: `cannot update reply` }, errorTypes.INTERVAL_SERVER_ERROR);
  }
};

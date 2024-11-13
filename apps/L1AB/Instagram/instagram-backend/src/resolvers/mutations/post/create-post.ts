import { MutationResolvers } from '../../../generated';
import { postsModel } from '../../../models';

export const createPost: MutationResolvers['createPost'] = async (_, { input }) => {
  const response = await postsModel.create(input);
  return response.toObject();
};

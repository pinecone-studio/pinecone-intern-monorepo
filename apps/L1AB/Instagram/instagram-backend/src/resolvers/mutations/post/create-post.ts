import { MutationResolvers, Response } from '../../../generated';
import { postsModel } from '../../../models';

export const createPost: MutationResolvers['createPost'] = async (_, { input }) => {
  await postsModel.create(input);
  return Response.Success;
};

import { MutationResolvers, Response } from '../../../generated';
import { storyModel } from '../../../models';

export const createStory: MutationResolvers['createStory'] = async (_, { input }) => {
  await storyModel.create(input);
  return Response.Success;
};

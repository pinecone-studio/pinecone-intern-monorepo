import { MutationResolvers } from '../../../generated';
import { storyModel } from '../../../models';

export const createStory: MutationResolvers['createStory'] = async (_, { input }) => {
  const newStory = await storyModel.create(input);
  return newStory;
};

import { QueryResolvers } from '../../../generated';
import { storyModel, StoryPopulatedType } from '../../../models';

export const getStoriesByUserId: QueryResolvers['getStoriesByUserId'] = async (_, { userId }) => {
  const stories = await storyModel.find({ userId: userId }).populate<StoryPopulatedType>('userId');

  return stories;
};

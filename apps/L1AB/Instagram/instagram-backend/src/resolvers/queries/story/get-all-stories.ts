import { QueryResolvers } from '../../../generated';
import { storyModel } from '../../../models';

export const getAllStories: QueryResolvers['getAllStories'] = async () => {
  const stories = await storyModel.find();
  return stories;
};

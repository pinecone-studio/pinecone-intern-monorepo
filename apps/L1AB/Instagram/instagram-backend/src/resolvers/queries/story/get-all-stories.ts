import { QueryResolvers } from '../../../generated';
import { storyModel, StoryPopulatedType } from '../../../models';

export const getAllStories: QueryResolvers['getAllStories'] = async () => {
  const stories = await storyModel.find().populate<StoryPopulatedType>('userId');
  return stories.map((el) => el.toObject());
};

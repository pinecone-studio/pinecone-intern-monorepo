import { QueryResolvers } from '../../../generated';
import { storyModel, StoryPopulatedType } from '../../../models';

export const getAllStories: QueryResolvers['getAllStories'] = async () => {
  const stories = await storyModel.find().populate<StoryPopulatedType>('userId');

  const group = stories.reduce((acc, story) => {
    const userId = story.userId._id.toString();

    if (!acc[userId]) {
      acc[userId] = [];
    }

    acc[userId].push(story);

    return acc;
  }, {} as Record<string, StoryPopulatedType[]>);
  const groupedArrays = Object.values(group);

  return groupedArrays;
};

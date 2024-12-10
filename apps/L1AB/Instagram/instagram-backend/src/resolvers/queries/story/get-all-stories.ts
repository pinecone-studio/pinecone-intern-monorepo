import { QueryResolvers } from '../../../generated';
import { storyModel, StoryPopulatedType } from '../../../models';

export const getAllStories: QueryResolvers['getAllStories'] = async () => {
  const stories = await storyModel.find().populate<StoryPopulatedType>('userId');

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const filteredByDate = stories.filter((story) => new Date(story.createdAt) > twentyFourHoursAgo);

  const sortedByDate = filteredByDate.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return sortedByDate;
};

import { QueryResolvers } from '../../../generated';
import { followersModel, storyModel, StoryPopulatedType } from '../../../models';

export const getAllStories: QueryResolvers['getAllStories'] = async (_, { followerId }) => {
  const followees = await followersModel.find({ followerId: followerId }).select('followeeId -_id');

  const followeeIds = followees.map((followee) => followee.followeeId);

  const stories = await storyModel.find({ userId: followeeIds }).populate<StoryPopulatedType>('userId');

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const filteredByDate = stories.filter((story) => new Date(story.createdAt) > twentyFourHoursAgo);

  const sortedByDate = filteredByDate.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  return sortedByDate;
};

import { log } from 'node:console';
import { QueryResolvers } from '../../../generated';
import { followersModel, storyModel, StoryPopulatedType } from '../../../models';

export const getAllStories: QueryResolvers['getAllStories'] = async (_, { followerId }) => {
  const myStory = await storyModel.find({ userId: followerId }).populate<StoryPopulatedType>('userId');
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  console.log(myStory);

  const myFilteredStories = myStory.filter((story) => new Date(story.createdAt) > twentyFourHoursAgo);
  // console.log(myFilteredStories);

  const mySortedStories = myFilteredStories.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateA.getTime() - dateB.getTime();
  });

  const followees = await followersModel.find({ followerId: followerId }).select('followeeId -_id');

  const followeeIds = followees.map((followee) => followee.followeeId);

  const stories = await storyModel.find({ userId: followeeIds }).populate<StoryPopulatedType>('userId');

  const filteredByDate = stories.filter((story) => new Date(story.createdAt) > twentyFourHoursAgo);

  const sortedByDate = filteredByDate.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateA.getTime() - dateB.getTime();
  });
  const allStories = [...mySortedStories, ...sortedByDate];
  // console.log(allStories);

  return allStories;
};

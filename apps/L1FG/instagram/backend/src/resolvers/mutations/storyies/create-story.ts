import { MutationResolvers } from '../../../generated';
import { StoryModel } from '../../../models';

export const createStory: MutationResolvers['createStory'] = async (_, { input }) => {
  const { userId, storyImage, expiringAt, duration } = input;

  const story = await StoryModel.create({
    userId,
    storyImage,
    expiringAt,
    duration,
  });

  return story;
};

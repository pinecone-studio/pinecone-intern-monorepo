import { MutationResolvers } from '../../../generated';
import { StoryViewModel } from '../../../models';

export const createStoryView: MutationResolvers['createStoryView'] = async (_, { input }) => {
  const { userId, storyNodeId, latestStory } = input;

  const StoryView = StoryViewModel.create({
    userId,
    storyNodeId,
    latestStory,
  });

  return StoryView;
};

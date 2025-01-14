import { MutationResolvers } from '../../../generated';
import { StoryLikeModal } from '../../../models';

export const createStoryLike: MutationResolvers['createStoryLike'] = async (_, { input }) => {
  const { userId, storyId } = input;

  const storyLike = await StoryLikeModal.create({
    userId,
    storyId,
  });

  return storyLike;
};

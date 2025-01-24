import { MutationResolvers } from '../../../generated';
import { StoryModel} from '../../../models';

export const createStory: MutationResolvers['createStory'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { storyImage } = input;
  const expiringAt=(Date.now() +3600000);
  const story = await StoryModel.create({
    userId,
    storyImage,
    expiringAt:new Date(expiringAt)
  });
return story
};

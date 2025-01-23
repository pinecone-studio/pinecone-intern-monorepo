import { MutationResolvers } from '../../../generated';
import { StoryModel, StoryNodeModel } from '../../../models';

export const createStory: MutationResolvers['createStory'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { storyImage } = input;

  const story = await StoryModel.create({
    userId,
    storyImage,
  });

  const { _id } = story;

  const existNode = await StoryNodeModel.findOne({ userId });

  if (!existNode) {
    const createNode = await StoryNodeModel.create({
      userId,
      stories: _id,
      latestAt: _id,
    });
    return createNode;
  }

  const updateNode = await StoryNodeModel.findOneAndUpdate({ userId: userId }, { $push: { stories: _id }, latestAt: _id }, { new: true });

  return updateNode;
};

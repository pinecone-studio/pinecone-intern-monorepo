import { MutationResolvers, Response } from '../../../generated';
import { storyModel } from '../../../models';

export const deleteStory: MutationResolvers['deleteStory'] = async (_, { input }) => {
  const story = await storyModel.findOne({ _id: input._id, userId: input.userId });
  if (!story) {
    throw new Error('Story not found or does not belong to the user');
  }
  await storyModel.findByIdAndDelete(input._id);
  return Response.Success;
};

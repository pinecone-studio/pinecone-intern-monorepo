import { MutationResolvers } from '../../../generated';
import { StoryViewModel } from '../../../models';

export const updateStoryView: MutationResolvers['updateStoryView'] = async (_, { input }, { userId }) => {
  if (!userId) throw new Error('Unauthorized');
  const { seen, ownerId } = input;
  const StoryView = StoryViewModel.findOneAndUpdate(
    {
      ownerId,
      viewerId: userId,
    },
    {
      $set: { seen: seen },
    },
    {
      new: true,
      upsert: true,
    }
  );
  return StoryView;
};

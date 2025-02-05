import { UserTogetherUserTypeResolvers } from '../../../generated';
import { StoryModel, StoryViewModel } from '../../../models';

export const seenStoryTime: UserTogetherUserTypeResolvers['seenStoryTime'] = async (parent, _, { userId }) => {
  const stories = await StoryModel.find({
    userId: parent._id,
    expiringAt: {
      $gte: new Date(),
    },
  }).sort({ _id: -1 });
  if (stories.length <= 0) {
    await StoryViewModel.findOneAndUpdate(
      {
        ownerId: parent._id,
        viewerId: userId,
      },
      {
        seen: 0,
      }
    );
    return 0;
  }
  const storyView = await StoryViewModel.findOne({
    ownerId: parent._id,
    viewerId: userId,
  });
  if (!storyView) {
    return 0;
  }
  return storyView.seen;
};

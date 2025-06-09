import { profileModel } from '../../../models';

export const dislike = async (_: unknown, { fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
  const dislikedProfile = await profileModel.findById(fromUserId);
  if (!dislikedProfile) {
    throw new Error('profile not found');
  }

  dislikedProfile.disliked = [...(dislikedProfile.disliked || []), toUserId];
  await dislikedProfile.save();

  return 'User disliked successfully';
};

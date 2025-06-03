import { MutationResolvers } from '../../../generated';
import { profileModel } from '../../../models/profile.model';

export const dislike: MutationResolvers['dislike'] = async (_: unknown, { likerId, likedId }) => {
  const liker = await profileModel.findById(likerId);
  const liked = await profileModel.findById(likedId);

  if (!liker || !liked) throw new Error('Profile not found');
  liker.liked = liker.liked.filter((id: string) => id !== likedId);
  liker.matched = liker.matched.filter((id: string) => id !== likedId);
  liked.matched = liked.matched.filter((id: string) => id !== likerId);
  if (!liker.disliked.includes(likedId)) {
    liker.disliked.push(likedId);
  }
  await liker.save();
  await liked.save();

  return {
    match: false,
    matchedUserId: undefined,
  };
};

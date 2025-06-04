import { MutationResolvers } from '../../../generated';
import { profileModel } from '../../../models/profile.model';

async function validateProfiles(likerId: string, likedId: string) {
  if (likerId === likedId) throw new Error('Cannot like yourself');

  const liker = await profileModel.findById(likerId);
  const liked = await profileModel.findById(likedId);

  if (!liker || !liked) throw new Error('Profile not found');

  return { liker, liked };
}

function handleMutualLike(liker: any, liked: any, likedId: string, likerId: string) {
  if (!liker.matched.includes(likedId)) {
    liker.matched.push(likedId);
    liked.matched.push(likerId);
  }
  liked.disliked = liked.disliked.filter((id: string) => id !== likerId);
  liked.liked = liked.liked.filter((id: string) => id !== likerId);
}

async function saveProfiles(liker: any, liked: any) {
  await liker.save();
  await liked.save();
}

export const like: MutationResolvers['like'] = async (_: unknown, { likerId, likedId }) => {
  const { liker, liked } = await validateProfiles(likerId, likedId);

  liker.disliked = liker.disliked.filter((id: string) => id !== likedId);

  const isMutualLike = liked.liked.includes(likerId);

  if (isMutualLike) {
    handleMutualLike(liker, liked, likedId, likerId);
    await saveProfiles(liker, liked);

    return {
      match: true,
      matchedUserId: likedId,
    };
  } else {
    if (!liker.liked.includes(likedId)) {
      liker.liked.push(likedId);
    }
    await liker.save();

    return {
      match: false,
      matchedUserId: undefined,
    };
  }
};

import { profileModel } from '../../../models';

async function findProfiles(fromUserId: string, toUserId: string) {
  const [fromProfile, toProfile] = await Promise.all([profileModel.findById(fromUserId), profileModel.findById(toUserId)]);

  if (!fromProfile || !toProfile) {
    throw new Error('One or both profiles not found');
  }

  return { fromProfile, toProfile };
}

function addLike(profile: any, userId: string) {
  if (!profile.liked.includes(userId)) {
    profile.liked.push(userId);
  }
}

function addMatch(profile: any, userId: string) {
  if (!profile.matched.includes(userId)) {
    profile.matched.push(userId);
  }
}

export const like = async (_: unknown, { fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
  const { fromProfile, toProfile } = await findProfiles(fromUserId, toUserId);

  addLike(fromProfile, toUserId);
  await fromProfile.save();

  const isMatched = toProfile.liked.includes(fromUserId);
  if (isMatched) {
    addMatch(fromProfile, toUserId);
    addMatch(toProfile, fromUserId);
    await Promise.all([fromProfile.save(), toProfile.save()]);
    return 'Match occurred! 🎉';
  }

  return 'User liked successfully';
};

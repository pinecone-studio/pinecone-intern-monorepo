import { profileModel } from '../../../models';

export const fetchProfile = async (_: unknown, { _id }: { _id: string }) => {
  const profile = await profileModel.findById(_id).populate('user').populate('matched');
  if (!profile) {
    throw new Error('Profile not found');
  }
  return profile;
};

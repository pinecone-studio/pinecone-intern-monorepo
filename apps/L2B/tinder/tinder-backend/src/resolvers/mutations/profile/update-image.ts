import { profileModel } from '../../../models/profile.model';

export const updateProfileImage = async (_: unknown, { userId, images }: { userId: string; images: string }) => {
  const updatedProfile = await profileModel.findOneAndUpdate({ user: userId }, { $set: { images: [images] } }, { new: true });

  if (!updatedProfile) {
    throw new Error('Profile not found. Please create a profile first.');
  }

  return updatedProfile;
};

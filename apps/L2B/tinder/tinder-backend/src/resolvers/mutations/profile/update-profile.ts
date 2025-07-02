import { MutationResolvers } from '../../../generated';
import { profileModel } from '../../../models/profile.model';

export const updateProfile: MutationResolvers['updateProfile'] = async (_: unknown, { id, input }) => {
  const updatedProfile = await profileModel.findOneAndUpdate({ user: id }, { $set: { ...input } }, { new: true });
  console.log(updatedProfile);
  if (!updatedProfile) {
    throw new Error('Profile not found');
  }

  return updatedProfile;
};

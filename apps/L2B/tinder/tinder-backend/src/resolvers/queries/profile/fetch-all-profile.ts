import { profileModel } from '../../../models/profile.model';

export const fetchAllProfile = async () => {
  const profiles = await profileModel.find().populate('user');
  if (!profiles) {
    throw new Error('Profiles not found');
  }
  return profiles;
};

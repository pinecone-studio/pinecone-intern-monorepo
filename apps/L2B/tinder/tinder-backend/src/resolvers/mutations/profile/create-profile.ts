import { MutationResolvers } from '../../../generated';
import { profileModel } from '../../../models/profile.model';

export const createProfile: MutationResolvers['createProfile'] = async (_: unknown, { input }) => {
  const newProfile = await profileModel.create({
    user: input.user,
    interestedIn: input.interestedIn,
    age: input.age,
    profileInfo: {
      name: input.profileInfo.name,
      bio: input.profileInfo.bio,
      interest: input.profileInfo.interest,
      profession: input.profileInfo.profession,
      school: input.profileInfo.school,
    },
    images: input.images,
  });

  return newProfile;
};

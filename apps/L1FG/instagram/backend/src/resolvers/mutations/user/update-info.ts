import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateInfo: MutationResolvers['updateInfo'] = async (_, { input }, { userId }) => {
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const updatedUser = await UserModel.findByIdAndUpdate(userId, { fullName: input.fullName, userName: input.userName, bio: input.bio, gender: input.gender }, { new: true, runValidations: true });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return {
    userName: updatedUser.userName,
    fullName: updatedUser.fullName,
    bio: updatedUser.bio,
    gender: updatedUser.gender,
  };
};

import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateUserImage: MutationResolvers['updateUserImage'] = async (_, { input }) => {
  const { _id, profileImage } = input;

  const user = await UserModel.findByIdAndUpdate(_id, { profileImage }, { new: true });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const updateUser: MutationResolvers['updateUser'] = async (_, { input, _id }) => {
  const updatedUser = await userModel.findByIdAndUpdate(_id, input, { new: true });

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return updatedUser;
};

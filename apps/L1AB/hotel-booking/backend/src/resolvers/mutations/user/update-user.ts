import { MutationResolvers } from '../../../generated';
import { userModel } from '../../../models';

export const updateUser: MutationResolvers['updateUser'] = async (_: unknown, { input }) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(input._id, input, { new: true });
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

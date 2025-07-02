import { MutationResolvers } from 'src/generated';
import { UserModel } from 'src/models/user.model';

export const updateUser: MutationResolvers['updateUser'] = async (_, { userId, input: { phoneNumber, email, password, profile } }) => {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, { $set: { phoneNumber, email, password, profile } }, { new: true, runValidators: true });

  if (!updatedUser) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return updatedUser;
};

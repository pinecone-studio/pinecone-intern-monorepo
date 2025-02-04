import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';

export const changePassword: MutationResolvers['changePassword'] = async (_, { input }) => {
  const { _id, newPassword, newRePassword } = input;

  if (newPassword !== newRePassword) {
    throw new Error('Passwords do not match');
  }

  const user = await UserModel.findById(_id);
  if (!user) {
    throw new Error('User not found');
  }

  // Hash new password before saving
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;

  await user.save();
  return user;
};

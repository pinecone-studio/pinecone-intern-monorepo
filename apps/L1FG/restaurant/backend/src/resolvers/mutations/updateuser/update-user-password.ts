import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';

export const updatePasswordUser: MutationResolvers['updatePasswordUser'] = async (_, { input }) => {
  const { _id, newPassword, password, newRePassword } = input;

  if (newPassword !== newRePassword) {
    throw new Error('Passwords do not match');
  }

  const user = await UserModel.findById(_id);
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect current password');
  }

  // Hash new password before saving
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;

  await user.save();
  return user;
};

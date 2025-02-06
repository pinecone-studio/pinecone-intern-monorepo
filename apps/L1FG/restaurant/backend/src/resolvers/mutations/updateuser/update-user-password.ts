import { MutationResolvers, Response } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';

export const updatePasswordUser: MutationResolvers['updatePasswordUser'] = async (_, { input }) => {
  const { _id, newPassword, password, newRePassword } = input;

  if (newPassword !== newRePassword) {
    throw new Error('New passwords do not match');
  }

  const user = await UserModel.findById(_id);
  if (!user) {
    throw new Error('User not found');
  }

  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Incorrect current password');
  }

  // Hash the new password before storing
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await UserModel.updateOne({ _id }, { password: hashedNewPassword });

  return Response.Success;
};

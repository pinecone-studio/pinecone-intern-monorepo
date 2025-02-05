import { MutationResolvers, Response } from '../../../generated';
import { UserModel } from '../../../models';
import bcrypt from 'bcryptjs';

export const changePassword: MutationResolvers['changePassword'] = async (_, { input }) => {
  const { _id, newPassword, newRePassword } = input;

  if (newPassword !== newRePassword) {
    throw new Error('Passwords do not match');
  }

  const user = await UserModel.findById(_id);
  if (!user) {
    throw new Error('User not found');
  }
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await UserModel.updateOne(
    {
      _id,
    },
    {
      password: hashedNewPassword,
      otp: '',
    }
  );

  return Response.Success;
};

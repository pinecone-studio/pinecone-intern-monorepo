import { MutationResolvers, Response } from '../../../generated';
import { UserModel } from '../../../models';

export const changePassword: MutationResolvers['changePassword'] = async (_, { input }) => {
  const { _id, newPassword, newRePassword } = input;

  if (newPassword !== newRePassword) {
    throw new Error('Passwords do not match');
  }

  const user = await UserModel.findById(_id);
  if (!user) {
    throw new Error('User not found');
  }

  await UserModel.updateOne(
    {
      _id,
    },
    {
      newPassword,
      otp: '',
    }
  );

  return Response.Success;
};

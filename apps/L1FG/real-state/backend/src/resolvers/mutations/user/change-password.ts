import { MutationResolvers, Response } from '../../../generated';
import { UserModel } from '../../../models';

export const changePassword: MutationResolvers['changePassword'] = async (_, { input }) => {
  const { email, password, otp } = input;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error('User not Found');
  }

  if (user.otp !== otp) {
    throw new Error('Invalid OTP');
  }
  await UserModel.updateOne(
    { email },
    {
      password,
      otp: '',
    }
  );
  return Response.Success;
};

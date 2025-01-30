import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const updateForgetPassword: MutationResolvers['updateForgetPassword'] = async (_, { input }) => {
  const { email, otp } = input;

  const user = await UserModel.findOne({ email });

  if (!user) throw new Error('User not found');

  if (user.otp !== otp) throw new Error('Invalid OTP');

  await UserModel.updateOne(
    {
      email,
    },
    {
      otp: '',
    }
  );
  return {
    token: 'newToken',
    user,
  };
};

import { userModel } from '../../../../models';

export const forgotMatchOtp = async (_: unknown, { email, otp }: { email: string; otp: string }) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error('user not found');
  }
  if (user.verficationCode === otp) {
    return 'success';
  }
  return 'failed';
};

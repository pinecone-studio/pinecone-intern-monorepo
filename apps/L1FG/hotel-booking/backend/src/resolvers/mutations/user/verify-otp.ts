import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const verifyOTP: MutationResolvers['verifyOTP'] = async (_, { input }) => {
  const { email, verifyOtp } = input;
  const user = await UserModel.findOne({ email });

  if (user.otp !== verifyOtp) throw new Error('Invalid OTP');

  await UserModel.findByIdAndUpdate(user._id, { $unset: { otp: 1 } });

  const Success = true;

  return { success: Success };
};

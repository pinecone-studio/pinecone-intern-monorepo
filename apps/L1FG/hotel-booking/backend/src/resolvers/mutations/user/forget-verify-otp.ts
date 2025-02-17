import { MutationResolvers } from '../../../generated';
import { UserModel } from '../../../models';

export const forgetVerifyOTP: MutationResolvers['forgetVerifyOTP'] = async (_, { input }) => {
  const { email, verifyOtp } = input;
  const user = await UserModel.findOne({ email });

  if (user.otp !== verifyOtp) {
    return { success: false, email: email };
  }

  await UserModel.findByIdAndUpdate(user._id, { $unset: { otp: 1 } });

  return { success: true };
};

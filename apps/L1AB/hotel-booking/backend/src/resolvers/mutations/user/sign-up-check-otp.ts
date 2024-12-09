import { MutationResolvers } from '../../../generated';
import { otpModel } from '../../../models';

export const SignUpCheckOtp: MutationResolvers['SignUpCheckOtp'] = async (_, { input }) => {
  const { email, otp } = input;

  const response = await otpModel.findOne({ email });

  if (!response) {
    throw new Error('No OTP found for the provided email');
  }

  if (otp !== response.otp) {
    throw new Error('Invalid OTP');
  }

  return {
    otp: { email: response.email, otp: response.otp },
    success: true,
    message: 'OTP verified successfully',
  };
};

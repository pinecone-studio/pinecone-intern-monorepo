import { MutationResolvers } from '../../../generated';
import { accessTokenModel, otpModel } from '../../../models';
import { nanoid } from 'nanoid';

export const verifyOtp: MutationResolvers['verifyOtp'] = async (_, { input }) => {
  const { email, otp } = input;

  const response = await otpModel.findOne({ email });

  if (!response) throw new Error('OTP expired or not found');

  if (response.otp !== otp) throw new Error('Invalid OTP');

  const accessToken = nanoid() as string;

  await accessTokenModel.create({
    email,
    accessToken: accessToken,
  });

  return {
    success: true,
    email: email,
    accessToken: accessToken,
  };
};

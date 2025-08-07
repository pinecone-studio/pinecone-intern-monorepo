import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';
export const verifyOtp: MutationResolvers['verifyOtp'] = async (_, { email, otp }) => {
  const record = await UserOtpModel.findOne({ email });
  if (!record) throw new Error('No OTP request found');
  if (record.expiresAt < new Date()) throw new Error('OTP expired');
  if (record.otp !== otp) throw new Error('Invalid OTP');

  record.verified = true;
  await record.save();
  return { input: email, output: 'OTP verified successfully' };
};

import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';
import { Usermodel } from 'src/models/user';

export const verifyOtp: MutationResolvers['verifyOtp'] = async (_, { email, otp, otpType }) => {
  const record = await UserOtpModel.findOne({ email, otpType });

  if (!record) throw new Error('No OTP request found for this operation');
  if (record.expiresAt < new Date()) throw new Error('OTP expired');
  if (record.otp !== otp) throw new Error('Invalid OTP');

  if (otpType === 'create') {
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) throw new Error('Email already registered');
  } else if (otpType === 'forgot') {
    const existingUser = await Usermodel.findOne({ email });
    if (!existingUser) throw new Error('Email not registered');
  } else {
    throw new Error('Invalid OTP type');
  }

  record.verified = true;
  await record.save();

  return {
    input: email,
    output: 'OTP verified successfully',
    otpId: record._id.toString(),
  };
};

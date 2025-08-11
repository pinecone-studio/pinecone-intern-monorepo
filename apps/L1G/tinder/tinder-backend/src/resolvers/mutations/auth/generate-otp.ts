import { Usermodel } from 'src/models/user';
import { sendOtpEmail } from 'src/utils/send-otp-email';
import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

export const requestSignup: MutationResolvers['requestSignup'] = async (_, { email, otpType }) => {
  const existingUser = await Usermodel.findOne({ email });

  if (otpType === 'create') {
    if (existingUser) throw new Error('Email already registered');
  } else if (otpType === 'forgot') {
    if (!existingUser) throw new Error('Email not found');
  } else {
    throw new Error('Invalid OTP type');
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await UserOtpModel.findOneAndUpdate({ email }, { otp, expiresAt, verified: false, otpType }, { upsert: true, new: true });

  await sendOtpEmail(email, otp);

  return { input: email, output: 'OTP sent to your email' };
};

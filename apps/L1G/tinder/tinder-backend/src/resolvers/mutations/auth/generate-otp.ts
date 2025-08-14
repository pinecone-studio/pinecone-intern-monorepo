import { Usermodel } from 'src/models/user';
import { sendOtpEmail } from 'src/utils/send-otp-email';
import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

async function validateUserForOtp(email: string, otpType: string) {
  const existingUser = await Usermodel.findOne({ email });

  const validators: Record<string, () => void> = {
    create: () => {
      if (existingUser) throw new Error('Email already registered');
    },
    forgot: () => {
      if (!existingUser) throw new Error('Email not found');
    },
  };

  const validate = validators[otpType];
  if (!validate) throw new Error('Invalid OTP type');

  validate();
}
export const requestSignup: MutationResolvers['requestSignup'] = async (_, { email, otpType }) => {
  await validateUserForOtp(email, otpType);

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await UserOtpModel.findOneAndUpdate({ email }, { otp, expiresAt, verified: false, otpType }, { upsert: true, new: true });

  await sendOtpEmail(email, otp);

  return {
    input: email,
    output: 'OTP sent to your email',
  };
};

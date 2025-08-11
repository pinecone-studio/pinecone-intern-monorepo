import { MutationResolvers } from 'src/generated';
import { UserOtpModel } from 'src/models/user-otp.model';
import { Usermodel } from 'src/models/user';

async function getOtpRecord(email: string, otpType: string) {
  const record = await UserOtpModel.findOne({ email, otpType });
  if (!record) throw new Error('No OTP request found for this operation');
  if (record.expiresAt < new Date()) throw new Error('OTP expired');
  return record;
}

function validateOtp(recordOtp: string, inputOtp: string) {
  if (recordOtp !== inputOtp) throw new Error('Invalid OTP');
}

async function validateOtpType(otpType: string) {
  if (otpType !== 'create' && otpType !== 'forgot') {
    throw new Error('Invalid OTP type');
  }
}

async function checkUserForCreate(email: string) {
  const existingUser = await Usermodel.findOne({ email });
  if (existingUser) throw new Error('Email already registered');
}

async function checkUserForForgot(email: string) {
  const existingUser = await Usermodel.findOne({ email });
  if (!existingUser) throw new Error('Email not registered');
}

export const verifyOtp: MutationResolvers['verifyOtp'] = async (_, { email, otp, otpType }) => {
  const record = await getOtpRecord(email, otpType);

  validateOtp(record.otp, otp);

  await validateOtpType(otpType);

  if (otpType === 'create') {
    await checkUserForCreate(email);
  }
  if (otpType === 'forgot') {
    await checkUserForForgot(email);
  }

  record.verified = true;
  await record.save();

  return {
    input: email,
    output: 'OTP verified successfully',
    otpId: record._id.toString(),
  };
};

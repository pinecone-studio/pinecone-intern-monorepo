import { userModel } from '../../models';
import { OTP } from '../../models/otp.model';
import { hashPassword } from '../../utils/auth';
import { sendOTPEmail } from '../../utils/email';
import { generateOTP, verifyOTP } from '../../utils/otp';

export const requestPasswordReset = async (_: unknown, { email }: { email: string }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error('Email not found');

  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await OTP.findOneAndUpdate({ email }, { otp, expiresAt }, { upsert: true, new: true });

  await sendOTPEmail(email, otp);
  return { success: true, message: 'OTP sent successfully' };
};

export const verifyPasswordResetOTP = async (_: unknown, { email, otp }: { email: string; otp: string }) => {
  const isValid = await verifyOTP(email, otp);
  if (!isValid) throw new Error('Invalid OTP');
  return { success: true, message: 'OTP verified successfully' };
};

export const resetPassword = async (_: unknown, { email, password }: { email: string; password: string }) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error('User not found');

  user.password = await hashPassword(password);
  await user.save();

  return { success: true, message: 'Password reset successfully' };
};

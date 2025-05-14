import { randomInt } from 'crypto';
import { OTP } from '../models/otp.model';

export const generateOTP = (): string => {
  return randomInt(1000, 9999).toString();
};

export const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
  const otpRecord = await OTP.findOne({ email });
  if (!otpRecord) return false;

  const isValid = otpRecord.otp === otp && otpRecord.expiresAt > new Date();
  if (isValid) await OTP.deleteOne({ email });

  return isValid;
};

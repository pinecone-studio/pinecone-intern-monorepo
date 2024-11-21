import { Schema, model, models } from 'mongoose';

export type OtpType = {
  email: string;
  otp: string;
  createdAt: Date;
};

const OTPSchema = new Schema<OtpType>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m',
  },
});

export const otpModel = models['otps'] || model('otps', OTPSchema);

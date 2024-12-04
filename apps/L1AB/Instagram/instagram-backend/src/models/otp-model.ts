import { model, models, Schema } from 'mongoose';

export type OtpType = {
  email: string;
  otp: string;
  createAt: Date;
};

const OtpSchema = new Schema<OtpType>({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now,
    expires: '5m',
  },
});

export const otpModel = models['Otp'] || model('Otp', OtpSchema);

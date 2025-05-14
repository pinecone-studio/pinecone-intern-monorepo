import mongoose, { models } from 'mongoose';

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP = models.OTP || mongoose.model('OTP', OTPSchema);

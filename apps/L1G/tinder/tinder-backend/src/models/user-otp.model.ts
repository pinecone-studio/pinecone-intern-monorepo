import mongoose from 'mongoose';

const userOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  registered: { type: Boolean, default: false },
});

export const UserOtpModel = mongoose.models.UserOtp || mongoose.model('UserOtp', userOtpSchema);

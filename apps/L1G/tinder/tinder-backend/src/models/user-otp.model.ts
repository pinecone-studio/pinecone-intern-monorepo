import mongoose from 'mongoose';

const userOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  registered: { type: Boolean, default: false },
  otpType: { type: String, enum: ['create', 'forgot'], default: 'create' },
  createdAt: { type: Date, default: Date.now, expires: 60 },
});

export const UserOtpModel = mongoose.models.UserOtp || mongoose.model('UserOtp', userOtpSchema);

import mongoose from 'mongoose';

const userOtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  verified: { type: Boolean, default: false },
  registered: { type: Boolean, default: false },
  otpType: { type: String, enum: ['create', 'forgot'], default: 'create' },
expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export const UserOtpModel = mongoose.models.UserOtp || mongoose.model('UserOtp', userOtpSchema);

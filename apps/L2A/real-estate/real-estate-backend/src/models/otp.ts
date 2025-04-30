import mongoose from 'mongoose';

const OTP_SCHEMA = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

export const OTP = mongoose.models.OTP || mongoose.model('OTP', OTP_SCHEMA);

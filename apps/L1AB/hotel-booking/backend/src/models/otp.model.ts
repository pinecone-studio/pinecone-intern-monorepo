import mongoose, { model, Schema } from 'mongoose';

const OtpSchema = new Schema({
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
    expires: '1m',
  },
});

export const otpModel = mongoose.models.otp || model('otp', OtpSchema);

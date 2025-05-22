import { model, models, Schema, Types } from 'mongoose';

const otpSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    otp: { type: Number, required: true },
  },
  { timestamps: true }
);

export const otpModel = models.otp || model('otp', otpSchema);

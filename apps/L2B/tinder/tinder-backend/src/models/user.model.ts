import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    verficationCode: { type: String, required: true },
  },
  { timestamps: true }
);
export const userModel = models.User || model('User', userSchema);

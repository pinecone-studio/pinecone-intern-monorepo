import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.models.user || model('user', userSchema);

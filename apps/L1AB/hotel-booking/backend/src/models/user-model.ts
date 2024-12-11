import mongoose, { model, Schema } from 'mongoose';

export type UserType = {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

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

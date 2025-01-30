import { model, models, Schema } from 'mongoose';

export type UserType = {
  _id: string;
  userName: string;
  email: string;
  profileImage: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  otp?: string;
};

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

export const UserModel = models['User'] || model('User', userSchema);

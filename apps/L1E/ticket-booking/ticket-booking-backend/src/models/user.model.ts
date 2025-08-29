import { ObjectId, Schema, model, models } from 'mongoose';

export type UserType = {
  _id: ObjectId | string;
  email: string;
  password: string;
  fullName: string;
  role: 'ADMIN' | 'USER';
  phone?: string;
  otp?: string;
  otpExpiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

const UserSchema = new Schema<UserType>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    phone: { type: String },
    otp: { type: String },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true }
);

export const User = models['User'] || model<UserType>('User', UserSchema);

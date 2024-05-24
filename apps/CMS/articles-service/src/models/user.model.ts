import { User } from '@/graphql/generated';
import { Schema, model, Model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Нийтлэгч',
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiresIn: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'author'],
    default: 'user',
  },
  avatar: {
    type: String,
    required: false,
  },
});

export const UserModel: Model<User> = models.user || model<User>('user', userSchema);

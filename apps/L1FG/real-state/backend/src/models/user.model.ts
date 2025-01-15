import { model, models, Schema } from 'mongoose';

export type UserType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  opt?: string;
};

const userSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  opt: {
    type: String,
  },
});

export const UserModel = models['User'] || model('User', userSchema);

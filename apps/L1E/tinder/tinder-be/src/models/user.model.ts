import { Schema, model, models } from 'mongoose';

export type UserType = {
  _id: string;
  username: string;
  fullname: string;
  interested: string;
  email: string;
  password: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
    default: 'no name',
  },
  fullname: {
    type: String,
    required: true,
  },
  interested: {
    type: String,
    required: true,
    default: 'prefet not to say',
    enum: ['male', 'female', 'prefet not to say'],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
    default: '',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const userModel = models['User'] || model('User', UserSchema);

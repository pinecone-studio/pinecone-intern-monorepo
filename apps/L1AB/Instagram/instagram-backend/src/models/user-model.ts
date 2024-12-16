import { Schema, model, models } from 'mongoose';

export type UserType = {
  _id: string;
  username: string;
  fullname: string;
  gender: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  isPrivate: boolean;
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
  gender: {
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
    // eslint-disable-next-line no-secrets/no-secrets
    default: 'https://res.cloudinary.com/doqzizxvi/image/upload/v1734325766/f10ff70a7155e5ab666bcdd1b45b726d_nlrma7.jpg',
  },
  bio: {
    type: String,
    required: false,
    default: '',
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: false,
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

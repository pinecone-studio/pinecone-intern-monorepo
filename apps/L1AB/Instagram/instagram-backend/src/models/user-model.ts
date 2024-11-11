import { Schema, model, models } from 'mongoose';

export type UserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string[];
  bio: string;
  isPrivave: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
    default: 'no name',
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
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  isPrivave: {
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

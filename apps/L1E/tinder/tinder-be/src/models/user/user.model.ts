import { Schema, model, models, Model } from 'mongoose';

export type UserType = {
  _id: string;
  username: string;
  interest: string;
  age: string;
  email: string;
  password: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  bio: string;
  profession: string;
  job: string;
  hobby: string;
  match: string;
};

const UserSchema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
    default: 'no name',
  },
  age: {
    type: String,
    required: true,
    default: '',
  },
  interest: {
    type: String,
    required: true,
    default: '',
    enum: ['male', 'female', 'prefer not to say'],
  },
  hobby: {
    type: String,
    required: true,
    default: '',
  },
  bio: {
    type: String,
    required: true,
    default: '',
  },
  profession: {
    type: String,
    required: true,
    default: '',
  },
  job: {
    type: String,
    required: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  match: {
    type: String,
    required: false,
    default: '',
  },
  images: [
    {
      type: String,
      required: true,
      default: '',
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

export const userModel: Model<UserType> = models['User'] || model<UserType>('User', UserSchema);

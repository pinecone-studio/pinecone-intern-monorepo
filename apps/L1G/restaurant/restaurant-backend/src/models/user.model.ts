import { Schema, model, models, Types } from 'mongoose';

export type User = {
  _id: Types.ObjectId;
  email: string;
  password: string;
  profile: string;
  phoneNumber: string;
  username: string;
  bonusPoints: number;
  role: 'admin' | 'user';
};

const UserSchema = new Schema<User>(
  {
    username : {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    bonusPoints: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = models.User || model<User>('User', UserSchema);

import { model, models, Schema, Types } from 'mongoose';

export type UserType = {
  _id: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  venues: [Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
};
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  venues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'venues',
      required: true,
    },
  ],
  phone: {
    type: String,
    required: true,
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
export const userModel = models['user'] || model('user', UserSchema);

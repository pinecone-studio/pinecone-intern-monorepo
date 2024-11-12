import { model, models, Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    default: 'Email is required',
  },
  password: {
    type: String,
    required: true,
    default: 'Password is required',
  },
  username: {
    type: String,
    required: true,
    default: 'Username is required',
  },
  fullname: {
    type: String,
    required: true,
    default: 'Username is required',
  },
  profilePicture: {
    type: String,
  },
  bio: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const UserModel = models.User || model('User', UserSchema);

/* eslint-disable no-secrets/no-secrets */
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Хэрэглэгч',
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
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'author'],
    default: 'user',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
});

export const UserModel = models.User || model('User', UserSchema);

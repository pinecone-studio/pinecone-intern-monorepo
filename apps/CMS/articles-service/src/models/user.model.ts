import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'author'],
    default: 'user',
  },
  otp: {
    type:String,
    required:false
  }
});

export const UserModel = mongoose.models.user || model('user', userSchema);

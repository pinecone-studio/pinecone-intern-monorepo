import { User } from '@/graphql/generated';
import { Schema, model, Model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiresIn: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['багш' , 'сурагч'],
    default: 'сурагч',
  },
  avatar: {
    type: String,
  },
});

const UserModel: Model<User> = models.user || model<User>('user', userSchema);
export default UserModel

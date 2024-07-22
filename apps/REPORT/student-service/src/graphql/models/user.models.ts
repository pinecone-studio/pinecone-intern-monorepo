import { models, Schema, model } from 'mongoose';

export const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    enum: ['ADMIN', 'STUDENT'],
    required: true,
    default: 'STUDENT',
  },
});
export const UserModel = models.user || model('user', userSchema);

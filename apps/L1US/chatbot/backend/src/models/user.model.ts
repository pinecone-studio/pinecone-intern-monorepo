import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export const UserModel = models.User || model('User', userSchema);

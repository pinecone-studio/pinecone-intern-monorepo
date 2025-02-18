import { model, models, Schema, Types } from 'mongoose';

type UserType = {
  _id: Types.ObjectId;
  email: string;
  password: string;
  otp?: string;
};
export const UserSchema = new Schema<UserType>({
  email: { type: String, required: true },
  password: {
    type: String,
  },
  otp: {
    type: String,
  },
});
export const UserModel = models['users'] || model('users', UserSchema);

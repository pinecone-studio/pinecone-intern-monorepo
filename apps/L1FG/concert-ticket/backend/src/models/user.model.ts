import { model, models, Schema } from 'mongoose';

type UserType = {
  email: string;
  password: string;
};
export const UserSchema = new Schema<UserType>({
  email: { type: String, required: true },
  password: {
    type: String,
  },
});
export const UserModel = models['users'] || model('users', UserSchema);

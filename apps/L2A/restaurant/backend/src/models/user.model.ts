import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
});

export const UserModel = models.User || model('User', UserSchema);

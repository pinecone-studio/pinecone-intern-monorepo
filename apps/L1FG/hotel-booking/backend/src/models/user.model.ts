import { model, models, Schema } from 'mongoose';
import { UserType } from '../types/common-types';

const UserSchema = new Schema<UserType>({
  firstName: { type: String },
  lastName: { type: String },
  birthDate: { type: Date },
  email: { type: String },
  phoneNumber: { type: String },
  emergencyContact: { type: [String] },
  status: { type: String },
  password: { type: String, requried: true },
});

export const UserModel = models['users'] || model<UserType>('users', UserSchema);

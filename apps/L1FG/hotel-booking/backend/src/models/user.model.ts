import { model, models, Schema } from 'mongoose';
import { UserType } from '../types/common-types';

const UserSchema = new Schema<UserType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String },
  phoneNumber: { type: String },
  emergencyContact: { type: [String] },
  status: { type: String },
});

export const UserModel = models['users'] || model<UserType>('users', UserSchema);

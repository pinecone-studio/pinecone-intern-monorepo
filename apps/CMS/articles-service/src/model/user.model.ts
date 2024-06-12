import { User } from '@/graphql/generated';
import { Model, Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
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
    type: String,
    required: true,
    enum: ['ADMIN', 'USER'],
  },
});

export const UserModel: Model<User> = models.User || model<User>(`User`, UserSchema);

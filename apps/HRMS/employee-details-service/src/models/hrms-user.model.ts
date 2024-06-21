import { hrmsUser } from '@/graphql/generated';
import { Model, Schema, model, models } from 'mongoose';

const hrmsUserSchema = new Schema<hrmsUser>({
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
    enum: ['EMPLOYEE', 'ADMIN'],
    required: true,
  },
});
export const hrmsUserModel: Model<hrmsUser> = models.hrmsUser || model<hrmsUser>('hrmsUser', hrmsUserSchema);

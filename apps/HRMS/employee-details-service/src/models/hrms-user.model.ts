import { HrmsUser } from '@/graphql/generated';
import { Model, Schema, model, models } from 'mongoose';

const hrmsUserSchema = new Schema<HrmsUser>({
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
export const hrmsUserModel: Model<HrmsUser> = models.hrmsUser || model<HrmsUser>('hrmsUser', hrmsUserSchema);

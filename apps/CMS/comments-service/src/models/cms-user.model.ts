import { CmsUser } from '@/graphql/generated';
import { Model, Schema, model, models } from 'mongoose';

const cmsUserSchema = new Schema<CmsUser>({
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
  roles: {
    type: [String],
    enum: ['ADMIN', 'CREATOR', 'USER'],
    required: true,
  },
});

export const cmsUserModel: Model<CmsUser> = models.cmsUser || model<CmsUser>('cmsUser', cmsUserSchema);

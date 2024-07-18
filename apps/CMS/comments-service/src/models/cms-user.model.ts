import { Model, Schema, model, models } from 'mongoose';

interface ICmsUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

const cmsUserSchema = new Schema<ICmsUser>({
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

export const cmsUserModel: Model<ICmsUser> = models.cmsUser || model<ICmsUser>('cmsUser', cmsUserSchema);

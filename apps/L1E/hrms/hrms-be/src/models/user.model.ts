import { Model, Schema, models, model } from 'mongoose';

export type UsersModelType = {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  address: string;
  password: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UsersModelType>({
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  isAdmin: { type: Boolean },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const UserModel: Model<UsersModelType> = models['Users'] || model<UsersModelType>('Users', UserSchema);

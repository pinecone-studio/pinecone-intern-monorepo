import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true, default: () => false },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const UserModel = models.user || model('User', userSchema);

import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    birth: { type: Date },
    emergencyPhone: { type: Number },
    relation: { type: String },
    phone: { type: Number },
    isAdmin: { type: Boolean, required: true, default: () => false },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const userModel = models.User || model('User', userSchema);

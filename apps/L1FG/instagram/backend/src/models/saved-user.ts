import mongoose, { model, models, Schema } from 'mongoose';

const SavedUserSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    savedUsers: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
  },
  { timestamps: true }
);

export const SavedUserModel = models['SavedUser'] || model('SavedUser', SavedUserSchema);

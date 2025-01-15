import mongoose, { model, models, Schema } from 'mongoose';

const storySchema = new Schema(
  {
    storyImage: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    expiringAt: { type: Date, default: new Date() },
    duration: { type: String, default:3 },
  },
  { timestamps: true }
);

export const StoryModel = models['Story'] || model('Story', storySchema);

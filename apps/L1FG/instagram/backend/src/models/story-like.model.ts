import mongoose, { model, models, Schema } from 'mongoose';

const storyLikeSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    storyId: { type: mongoose.Types.ObjectId, ref: 'Story' },
  },
  { timestamps: true }
);

export const StoryLikeModal = models['StoryLike'] || model('StoryLike', storyLikeSchema);

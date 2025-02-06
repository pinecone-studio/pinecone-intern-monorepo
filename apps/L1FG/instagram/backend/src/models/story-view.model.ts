import mongoose, { model, models, Schema } from 'mongoose';

const storyViewSchema = new Schema({
  ownerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  viewerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  seen: { type: Date, default: 0 },
});

export const StoryViewModel = models['StoryView'] || model('StoryView', storyViewSchema);

import mongoose, { model, models, Schema } from 'mongoose';

const storyViewSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  storyNodeId: { type: mongoose.Types.ObjectId, ref: 'StoryNode' },
  latestStory: { type: Date },
  seen: { type: Date, default: new Date() },
});

export const StoryViewModel = models['StoryView'] || model('StoryView', storyViewSchema);

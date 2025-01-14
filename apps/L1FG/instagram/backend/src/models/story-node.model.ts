import mongoose, { model, models, Schema } from 'mongoose';

const storyNodeSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
  stories: { type: [mongoose.Types.ObjectId], ref: 'Story' },
  latestAt: {type:  mongoose.Types.ObjectId, ref:"Story"}
});

export const StoryNodeModel = models['StoryNode'] || model('StoryNode', storyNodeSchema);

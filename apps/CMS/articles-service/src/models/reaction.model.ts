import mongoose, { Schema, model } from 'mongoose';

const reactionSchema = new Schema({
  emoji: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  count: { type: Number, required: true },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'article' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
});

export const reactionModel = mongoose.models.reaction || model('reaction', reactionSchema);

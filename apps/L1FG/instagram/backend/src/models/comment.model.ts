import mongoose, { model, models, Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    comment: { type: String },
  },
  { timestamps: true }
);

export const CommentModel = models['Comment'] || model('Comment', commentSchema);

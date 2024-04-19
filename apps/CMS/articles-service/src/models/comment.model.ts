import { Comment } from '@/graphql/generated';
import mongoose, { Model, Schema, model } from 'mongoose';

const commentSchema = new Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
});

export const CommentModel: Model<Comment> = mongoose.models.comment || model<Comment>('comment', commentSchema);

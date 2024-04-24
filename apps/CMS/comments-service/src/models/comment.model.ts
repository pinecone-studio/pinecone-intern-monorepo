import mongoose, { Schema, model } from 'mongoose';

const commentsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'article',
    required: true,
  },
});
export const CommentsModel = mongoose.models.comments || model('comments', commentsSchema);

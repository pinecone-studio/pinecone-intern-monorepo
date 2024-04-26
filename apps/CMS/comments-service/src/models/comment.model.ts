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
    default: new Date(),
    required: true,
  },
  ipAddress: {
    type: String,
    default: 'ipAddress default',
    required: true,
  },
  userAgent: {
    type: String,
    default: 'userAgent default',
    required: true,
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: 'article',
    required: true,
  },
});
export const CommentsModel = mongoose.models.comments || model('comments', commentsSchema);

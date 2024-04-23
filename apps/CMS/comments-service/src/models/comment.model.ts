import mongoose, { Schema, model } from 'mongoose';

const commentsSchema = new Schema({
  name: {
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
  ipAdress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
});
export const CommentsModel = mongoose.models.comments || model('comments', commentsSchema);

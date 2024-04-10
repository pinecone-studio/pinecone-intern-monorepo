import mongoose, { Schema, model } from 'mongoose';

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  coverPhoto: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
  },
  cateogry: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  }],
  status: {
    type: String,
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publishAt: Date,
  updatedAt: Date,
});

export const articleModel = mongoose.models.article || model('article', articleSchema);

import mongoose, { Schema, model } from 'mongoose';

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  coverPhoto: String,
  content: {
    type:String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required:true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required:true
  },
  status: {
    type: String,
    required:true
  },
  slug: {
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: Date,
  updatedAt: Date,
  scheduledAt:Date
});

export const articleModel = mongoose.models.article || model('article', articleSchema);
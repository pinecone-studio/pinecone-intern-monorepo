import { Article } from '@/graphql/generated';
import { Schema, model, Model, models } from 'mongoose';

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  coverPhoto: String,
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  commentPermission: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publishAt: Date,
  updatedAt: Date,
});

export const ArticleModel: Model<Article> = models.article || model<Article>('article', articleSchema);

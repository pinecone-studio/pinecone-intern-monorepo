import { Article } from '@/graphql/generated';
import { Schema, model, Model, models } from 'mongoose';

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  author: {
    type: String!,
    required: true,
  },
  status: {
    type: String!,
    required: true,
    enum: [' DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED'],
  },
  slug: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  articleId: {
    type: String,
    required: true,
  },
});

export const ArticleModel: Model<Article> = models.article || model<Article>('article', articleSchema);

import { Schema, model, Model, models } from 'mongoose';

export type ArticleCategory = {
  _id: string;
  name: string;
  createdAt: Date;
};

export type Article = {
  _id: string;
  title: string;
  content: string;
  coverPhoto: string;
  author: string;
  status: string;
  slug: string;
  category: ArticleCategory[];
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
  scheduledAt: Date;
};

const articleCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED'],
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
  category: {
    type: [articleCategorySchema],
    required: true,
  },
  scheduledAt: {
    type: Date,
    default: Date.now,
  },
});

export const ArticleModel: Model<Article> = models.article || model<Article>('article', articleSchema);

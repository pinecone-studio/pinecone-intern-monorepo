import { Category } from '@/graphql/generated';
import { Schema, model, Model, models } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CategoryModel: Model<Category> = models.category || model<Category>('category', categorySchema);

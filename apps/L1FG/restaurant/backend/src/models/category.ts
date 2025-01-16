import { model, models, Schema } from 'mongoose';

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const CategoryModel = models['Category'] || model('Category', categorySchema);

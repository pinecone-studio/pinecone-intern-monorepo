import { Schema, model, models } from 'mongoose';

export type Category = {
  _id: string;
  name: string;
  createdAt: Date;
};

const CategorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CategoryModel = models.Category || model<Category>('Category', CategorySchema);

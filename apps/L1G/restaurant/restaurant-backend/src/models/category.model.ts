import mongoose, { models, Types } from 'mongoose';

export type Category = {
  _id: Types.ObjectId;
  categoryName: string;
};

const CategorySchema = new mongoose.Schema<Category>(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = models.Category || mongoose.model('Category', CategorySchema);

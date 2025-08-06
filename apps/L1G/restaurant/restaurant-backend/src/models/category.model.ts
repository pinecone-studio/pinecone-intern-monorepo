import mongoose, { models, Types } from 'mongoose';

export type CategoryType = {
  _id: Types.ObjectId;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

const CategorySchema = new mongoose.Schema<CategoryType>(
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

export const CategoryModel = models.Category || mongoose.model<CategoryType>('Category', CategorySchema);

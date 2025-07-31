import mongoose, { models, Types } from 'mongoose';

export type MenuCategory = {
  _id: Types.ObjectId;
  categoryName: string;
};

const MenuCategorySchema = new mongoose.Schema<MenuCategory>(
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

export const MenuCategoryModel = models.MenuCategory || mongoose.model('Category', MenuCategorySchema);

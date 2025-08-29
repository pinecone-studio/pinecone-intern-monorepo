import mongoose, { models, Schema, Types } from 'mongoose';

export type CategoryType = {
  _id: Types.ObjectId;
  categoryName: string;
  food?: Types.ObjectId[];
};

const CategorySchema = new mongoose.Schema<CategoryType>(
  {
    categoryName: {
      type: String,
      required: true,
    },
    food: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = models.Category || mongoose.model<CategoryType>('Category', CategorySchema);

import mongoose, { models, Types } from 'mongoose';

export type Food = {
  _id: Types.ObjectId;
  foodName: string;
  image: string;
  price: string;
  status: string;
};

const FoodSchema = new mongoose.Schema<Food>(
  {
    foodName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enam: ['Идэвхитэй', 'Идэвхигүй'],
      default: 'Идэвхитэй',
    },
  },
  {
    timestamps: true,
  }
);

export const FoodModel = models.Food || mongoose.model<Food>('food', FoodSchema);

import { model, models, Schema, Types } from 'mongoose';

export type FoodType = {
  _id: Types.ObjectId;
  foodName: string;
  price: string;
  image: string;
  foodStatus: string;
  category: Types.ObjectId;
  discount: Types.ObjectId;
};

export const FoodSchema = new Schema<FoodType>(
  {
    foodName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    foodStatus: {
      type: String,
      required: true,
      enum: ['Идэвхитэй', 'Идэвхигүй'],
      default: 'Идэвхитэй',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: 'Discount',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const FoodModel = models.Food || model<FoodType>('Food', FoodSchema);

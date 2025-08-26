import { model, models, Schema, Types } from 'mongoose';
import { CategoryType } from './category.model';
import { DiscountType } from './discount.model';

export type FoodType = {
  _id: Types.ObjectId;
  foodName: string;
  price: string;
  image: string;
  status: string;
  category: Types.ObjectId;
  discount: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
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
    status: {
      type: String,
      required: true,
      enum: ['Идэвхитэй', 'Идэвхигүй'],
      default: 'Идэвхитэй',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: 'discount',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export type FoodPopulatedType = Omit<FoodType, 'category' | 'discount'> & {
  category: CategoryType;
  discount: DiscountType;
};

export const FoodModel = models.Food || model<FoodType>('food', FoodSchema);

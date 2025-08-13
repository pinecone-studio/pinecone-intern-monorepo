import { model, models, Schema, Types } from 'mongoose';

export type FoodOrderItem = {
  food: Types.ObjectId;
  quantity: number;
};

export type FoodOrder = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  totalPrice: number;
  foodOrderItems: FoodOrderItem[];
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SERVED';
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderItemSchema = new Schema<FoodOrderItem>(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const FoodOrderSchema = new Schema<FoodOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    foodOrderItems: {
      type: [FoodOrderItemSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SERVED'],
      default: 'PENDING',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FoodOrderModel = models.FoodOrder || model<FoodOrder>('FoodOrder', FoodOrderSchema);

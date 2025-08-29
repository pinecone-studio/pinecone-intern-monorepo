import { model, models, Schema, Types } from 'mongoose';

export type FoodOrderItem = {
  food: Types.ObjectId;
  quantity: number;
};

export type FoodOrder = {
  _id: Types.ObjectId;
  status: 'READY' | 'PREPARING' | 'DONE' | 'PENDING';
  totalPrice: number;
  orderNumber: number;
  user: Types.ObjectId;
  table: Types.ObjectId;
  foodOrder: FoodOrderItem[];
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
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: 'Table',
    },
    foodOrder: {
      type: [FoodOrderItemSchema],
    },
    orderNumber: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['READY', 'PREPARING', 'DONE', 'PENDING'],
      default: 'PENDING',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FoodOrderModel = models.FoodOrder || model<FoodOrder>('FoodOrder', FoodOrderSchema);

import { model, models, Schema, Types } from 'mongoose';

export type FoodOrderItem = {
  food: Types.ObjectId;
  quantity: number;
};

export type FoodOrder = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  table: Types.ObjectId;
  orderNumber: number;
  foodOrderItems: FoodOrderItem[];
  status: 'READY' | 'PREPARING' | 'DONE' | 'PENDING';
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderItemSchema = new Schema<FoodOrderItem>({
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
});

const FoodOrderSchema = new Schema<FoodOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
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
    foodOrderItems: {
      type: [FoodOrderItemSchema],
      required: true,
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

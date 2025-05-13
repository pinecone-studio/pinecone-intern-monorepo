import { Schema, model, models } from 'mongoose';
import { Order } from '../generated';

const orderSchema = new Schema<Order>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        priceWhenOrdered: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const orderModel = models['order'] || model('order', orderSchema);

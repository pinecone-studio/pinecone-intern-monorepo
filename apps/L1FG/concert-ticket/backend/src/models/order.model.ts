import { model, models, Schema, Types } from 'mongoose';

type OrderType = {
  _id: string;
  userId: Types.ObjectId;
  concertId: Types.ObjectId;
  phoneNumber: number;
  totalPrice: number;
  orderNumber: string;
  vipTicketId: Types.ObjectId;
  regularTicketId: Types.ObjectId;
  standingAreaTicketId: Types.ObjectId;
};
const orderSchema = new Schema<OrderType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    concertId: {
      type: Schema.Types.ObjectId,
      ref: 'concert',
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    orderNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export const OrderModel = models['order'] || model('order', orderSchema);

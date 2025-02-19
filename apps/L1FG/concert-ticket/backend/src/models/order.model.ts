import { model, models, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    concertID: {
      type: Schema.Types.ObjectId,
      ref: 'concert',
      required: true,
    },
    ticketID: {
      type: Schema.Types.ObjectId,
      ref: 'ticket',
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    ticketNumber: {
      type: String,
      required: true,
    },
    vipTicket: { price: Number, quantity: Number },
    regularTicket: { price: Number, quantity: Number },
    standingAreaTicket: { price: Number, quantity: Number },
    orderStatus: { type: String, enum: ['CANCEL', 'DELETE', 'DONE'], default: 'DONE' },
  },

  { timestamps: true }
);

export const OrderModel = models['order'] || model('order', orderSchema);

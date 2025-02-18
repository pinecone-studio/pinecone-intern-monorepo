import { model, models, Schema } from 'mongoose';

const orderSchema = new Schema({
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String },
      isRead: { type: Boolean },
    },
  ],
  userId: { type: String },
  tableId: { type: Number },
  status: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const OrderModel = models['Order'] || model('Order', orderSchema);

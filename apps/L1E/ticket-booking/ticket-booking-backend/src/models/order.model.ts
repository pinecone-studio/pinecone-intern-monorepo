import mongoose, { ObjectId, Schema, model, models } from 'mongoose';

export type OrderItemType = {
  ticketTypeId: ObjectId;
  quantity: number;
  price: number;
};

export type OrderType = {
  _id: ObjectId | string;
  userId: ObjectId;
  eventId: ObjectId;
  items: OrderItemType[];
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  createdAt?: Date;
  updatedAt?: Date;
};

const OrderItemSchema = new Schema<OrderItemType>({
  ticketTypeId: { type: mongoose.SchemaTypes.ObjectId, ref: 'TicketType', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<OrderType>(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Event', required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' },
  },
  { timestamps: true }
);

export const Order = models['Order'] || model<OrderType>('Order', OrderSchema);

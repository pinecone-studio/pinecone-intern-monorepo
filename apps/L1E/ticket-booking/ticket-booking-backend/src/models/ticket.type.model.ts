import mongoose, { ObjectId, Schema, model, models } from 'mongoose';

export type TicketTypeType = {
  _id: ObjectId | string;
  eventId: ObjectId;
  type: 'VIP' | 'REGULAR' | 'GENERAL';
  price: number;
  totalCount: number;
  remainingCount: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const TicketTypeSchema = new Schema<TicketTypeType>(
  {
    eventId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Event', required: true },
    type: { type: String, enum: ['VIP', 'REGULAR', 'GENERAL'], required: true },
    price: { type: Number, required: true },
    totalCount: { type: Number, required: true },
    remainingCount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const TicketType = models['TicketType'] || model<TicketTypeType>('TicketType', TicketTypeSchema);

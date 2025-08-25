import mongoose, { ObjectId, Schema, model, models } from 'mongoose';

export type TicketType = {
  _id: ObjectId | string;
  eventId: ObjectId; // Reference to Event
  userId: ObjectId; // Reference to User
  price: number;
  status: 'AVAILABLE' | 'SOLD' | 'CANCELLED';
  createdAt?: Date;
  updatedAt?: Date;
};

const TicketSchema = new Schema<TicketType>(
  {
    eventId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['AVAILABLE', 'SOLD', 'CANCELLED'], default: 'AVAILABLE' },
  },
  { timestamps: true }
);

export const Ticket = models['Ticket'] || model<TicketType>('Ticket', TicketSchema);

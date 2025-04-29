import { Schema, model, models, Types } from 'mongoose';

const ticketSchema = new Schema(
  {
    concert: { type: Types.ObjectId, ref: 'Concert', required: true },
    seatNumber: { type: String, required: true },
    price: { type: Number },
    type: {
      type: String,
      enum: ['VIP', 'STANDARD', 'BACKSEAT'],
      required: true,
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'RESERVED', 'SOLD'],
      default: 'AVAILABLE',
    },
  },
  { timestamps: true }
);

export const ticketModel = models.Ticket || model('Ticket', ticketSchema);

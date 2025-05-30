import { Schema, model, models, Types } from 'mongoose';

const ticketSchema = new Schema(
  {
    concert: { type: Types.ObjectId, ref: 'Concert', required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number },
    ticket: {
      Standard: {
        count: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
      },
      VIP: {
        count: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
      },
      Backseat: {
        count: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
      },
    },
  },
  { timestamps: true }
);

export const ticketModel = models.Ticket || model('Ticket', ticketSchema);

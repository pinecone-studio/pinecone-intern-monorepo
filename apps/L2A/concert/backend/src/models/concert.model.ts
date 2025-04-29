import { model, models, Schema, Types } from 'mongoose';
import { TicketType } from '../generated';

const concertSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true, default: () => new Date() },
  venue: { type: Types.ObjectId, ref: 'Venue', required: true },
  tickets: [{ type: Types.ObjectId, ref: 'Ticket' }],
  ticketCategories: [
    {
      type: {
        type: String,
        enum: Object.values(TicketType),
        required: true,
      },
      price: { type: Number, required: true },
      capacity: { type: Number, required: true },
    },
  ],
  artistName: { type: String, required: true },
  specialGuestName: { type: String },
});

export const concertModel = models.Concert || model('Concert', concertSchema);

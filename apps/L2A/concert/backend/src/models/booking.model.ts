import { model, models, Schema } from 'mongoose';
import { BookingStatus } from '../generated';

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    concert: { type: Schema.Types.ObjectId, ref: 'Concert', required: true },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket', required: true }],
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.Pending,
      required: true,
    },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const bookingsModel = models.Booking || model('Booking', bookingSchema);

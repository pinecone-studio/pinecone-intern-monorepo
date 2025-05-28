import { model, models, Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: {
      adults: { type: Number, required: true },
      children: { type: Number, required: true },
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['booked', 'checked_in', 'checked_out', 'cancelled'],
      default: 'booked',
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const bookingModel = models.Booking || model('Booking', bookingSchema);

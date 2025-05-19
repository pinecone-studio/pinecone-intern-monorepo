import { model, models, Schema, Types } from 'mongoose';

const BookingSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    hotelId: { type: Types.ObjectId, ref: 'Hotel', required: true },
    roomId: { type: Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: {
      adults: { type: Number, required: true, default: 1 },
      children: { type: Number, required: true, default: 0 },
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['booked', 'checked-in', 'checked-out', 'cancelled'],
      default: 'checked-out',
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const bookingModel = models.Booking || model('Booking', BookingSchema);

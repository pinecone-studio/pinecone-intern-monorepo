import { model, models, Schema, Types } from 'mongoose';

const BookingSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    hotelId: { type: Types.ObjectId, ref: 'Hotel', required: true },
    roomId: { type: Types.ObjectId, ref: 'Room', required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guests: {
      adults: { type: Number, required: true },
      children: { type: Number, required: true },
    },
    roomNumber: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ['booked', 'checked_in', 'checked_out', 'cancelled'],
      default: 'booked',
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const bookingModel = models.Booking || model('Booking', BookingSchema);

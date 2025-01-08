import { Schema, models, model } from 'mongoose';
import { BookingType } from '../types';

const BookingSchema = new Schema<BookingType>({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  hotelId: { type: Schema.Types.ObjectId, ref: 'hotels' },
  roomId: { type: Schema.Types.ObjectId, ref: 'rooms' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  phoneNumber: { type: String, reuqired: true },
  guestRequest: { type: String, default: '' },
  email: { type: String },
  status: { type: String },
});

export const BookingModel = models['bookings'] || model<BookingType>('bookings', BookingSchema);

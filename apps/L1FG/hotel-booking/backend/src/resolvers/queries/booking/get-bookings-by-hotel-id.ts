import { QueryResolvers } from '../../../generated';
import { BookingModel } from '../../../models';
import mongoose from 'mongoose';

export const getBookingsByHotelId: QueryResolvers['getBookingsByHotelId'] = async (_, { hotelId }) => {
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    throw new Error('Invalid ID format');
  }
  const bookings = await BookingModel.find({ hotelId: hotelId });
  if (bookings.length === 0) {
    return [];
  }
  return bookings;
};

import { QueryResolvers } from '../../../generated';
import { BookingModel } from '../../../models';
import mongoose from 'mongoose';

export const getBookingsByUserId: QueryResolvers['getBookingsByUserId'] = async (_, { userId }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid ID format');
  }
  const bookings = await BookingModel.find({ userId: userId });
  if (bookings.length === 0) {
    return [];
  }
  return bookings;
};

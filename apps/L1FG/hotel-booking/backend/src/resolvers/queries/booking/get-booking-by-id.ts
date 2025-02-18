import { QueryResolvers } from '../../../generated';
import { BookingModel } from '../../../models';
import mongoose from 'mongoose';

export const getBookingById: QueryResolvers['getBookingById'] = async (_, { id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  const booking = await BookingModel.findById(id);

  if (!booking) {
    throw new Error('Booking not found');
  }

  return booking;
};

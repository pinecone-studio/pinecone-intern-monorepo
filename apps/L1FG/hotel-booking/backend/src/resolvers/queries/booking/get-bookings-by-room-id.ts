import { QueryResolvers } from '../../../generated';
import { BookingModel } from '../../../models';
import mongoose from 'mongoose';

export const getBookingsByRoomId: QueryResolvers['getBookingsByRoomId'] = async (_, { roomId }) => {
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new Error('Invalid ID format');
  }
  const bookings = await BookingModel.find({ roomId: roomId });
  if (bookings.length === 0) {
    return [];
  }
  return bookings;
};

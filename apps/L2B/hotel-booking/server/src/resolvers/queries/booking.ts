import { QueryResolvers } from '../../generated';
import { bookingModel } from '../../models';

export const bookings: QueryResolvers['bookings'] = async () => {
  return await bookingModel.find({});
};

export const booking: QueryResolvers['booking'] = async (_, { id }) => {
  const foundBooking = await bookingModel.findById(id);
  if (!foundBooking) {
    throw new Error('Booking not found');
  }
  return foundBooking;
};

export const upcomingBookings: QueryResolvers['upcomingBookings'] = async () => {
  const today = new Date();
  return await bookingModel.find({ checkInDate: { $gte: today } });
};

export const pastBookings: QueryResolvers['pastBookings'] = async (_, { userId }) => {
  const today = new Date();
  return await bookingModel.find({
    userId,
    checkOutDate: { $lt: today },
  });
};

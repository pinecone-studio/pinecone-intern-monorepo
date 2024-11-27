import { QueryResolvers } from '../../../generated';
import { bookingModel } from '../../../models';

export const getBookingById: QueryResolvers['getBookingById'] = async (_, _id) => {
  const booking = await bookingModel.findById(_id);

  if (!booking) throw new Error('Booking not found');

  return booking;
};

import { QueryResolvers } from '../../../generated';
import { BookingModel } from '../../../models';

export const getBookings: QueryResolvers['getBookings'] = async () => {
  const bookings = await BookingModel.find();
  return bookings;
};

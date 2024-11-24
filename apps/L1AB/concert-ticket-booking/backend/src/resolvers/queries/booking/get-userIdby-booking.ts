import { QueryResolvers } from '../../../generated';
import { bookingModel, BookingPopulateType } from '../../../models';

export const getBookingByUserId: QueryResolvers['getBookingByUserId'] = async (_, { userId }) => {
  const bookings = await bookingModel.find({ userId }).populate<BookingPopulateType>(['eventId', 'userId']);

  if (!bookings || bookings.length === 0) throw new Error('No bookings found for this user');

  return bookings;
};

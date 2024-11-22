import { QueryResolvers } from '../../../generated';
import { bookingModel, BookingPopulateType } from '../../../models';

export const getAllBooking: QueryResolvers['getAllBooking'] = async () => {
  const allBooking = await bookingModel.find().populate<BookingPopulateType>(['eventId', 'userId']);
  return allBooking;
};

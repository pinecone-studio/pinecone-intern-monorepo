import { QueryResolvers } from '../../../generated';
import { bookingModel, bookingPopulatedType } from '../../../models';

export const getAllBookings: QueryResolvers['getAllBookings'] = async () => {
  const bookings = await bookingModel.find().populate<bookingPopulatedType>({
    path: 'roomId',
    populate: {
      path: 'hotelId'
    },
  });
  return bookings.map((booking) => booking.toObject());
};

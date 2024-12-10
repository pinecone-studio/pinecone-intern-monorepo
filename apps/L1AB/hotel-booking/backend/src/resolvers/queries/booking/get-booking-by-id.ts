import { QueryResolvers } from '../../../generated';
import { bookingModel, bookingPopulatedType } from '../../../models';

export const getBookingById: QueryResolvers['getBookingById'] = async (_: unknown, { _id }) => {
  const booking = await bookingModel.find({ _id }).populate<bookingPopulatedType>([
    {
      path: 'roomId',
      populate: {
        path: 'hotelId',
      },
    },
    'userId',
  ]);
  return booking.map((book) => book.toObject());
};

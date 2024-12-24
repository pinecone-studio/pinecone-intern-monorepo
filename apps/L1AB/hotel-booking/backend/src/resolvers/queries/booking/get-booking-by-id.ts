import { QueryResolvers } from '../../../generated';
import { bookingModel, bookingPopulatedType } from '../../../models';

export const getBookingById: QueryResolvers['getBookingById'] = async (_: unknown, { _id }) => {
  console.log(_id);

  const booking = await bookingModel.find({ roomId: _id }).populate<bookingPopulatedType>([
    {
      path: 'roomId',
      populate: {
        path: 'hotelId',
      },
    },
    'userId',
  ]);
  console.log(booking);

  return booking.map((book) => book.toObject());
};

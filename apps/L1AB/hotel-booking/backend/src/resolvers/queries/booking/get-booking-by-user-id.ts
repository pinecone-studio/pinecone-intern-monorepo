import { QueryResolvers } from '../../../generated';
import { bookingModel, bookingPopulatedType } from '../../../models';
import { Types } from 'mongoose';

export const getBookingByUserId: QueryResolvers['getBookingByUserId'] = async (_: unknown, { _id }) => {
  const objectId = Types.ObjectId.isValid(_id) ? new Types.ObjectId(_id) : null;

  if (!objectId) {
    throw new Error('Invalid User ID');
  }

  const bookings = await bookingModel.find({ userId: objectId }).populate<bookingPopulatedType>([
    {
      path: 'roomId',
      populate: {
        path: 'hotelId',
      },
    },
    'userId',
  ]);

  return bookings.map((booking) => booking.toObject());
};

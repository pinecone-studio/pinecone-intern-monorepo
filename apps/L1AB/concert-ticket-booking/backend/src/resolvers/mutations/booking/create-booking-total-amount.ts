import { MutationResolvers } from '../../../generated';
import { bookingModel } from '../../../models';

export const createBookingTotalAmount: MutationResolvers['createBooking'] = async (_, { input }) => {
  const venues = input.venues || [];

  const amountTotal = venues.reduce((total, venue) => {
    return total + venue.quantity * venue.price;
  }, 0);

  const bookingData = {
    ...input,
    amountTotal,
  };

  const booking = await bookingModel.create(bookingData);

  return booking;
};

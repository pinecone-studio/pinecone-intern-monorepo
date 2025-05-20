import { MutationResolvers } from '../../generated';
import { bookingModel } from '../../models';

export const createBooking: MutationResolvers['createBooking'] = async (_: unknown, { input }) => {
  try {
    const newBooking = await bookingModel.create({
      ...input,
      status: 'booked',
    });
    return newBooking;
  } catch (error) {
    throw new Error('Booking creation failed');
  }
};

export const updateBookingStatus: MutationResolvers['updateBookingStatus'] = async (_, { id, status }) => {
  try {
    const updated = await bookingModel.findByIdAndUpdate(id, { status }, { new: true });
    return updated;
  } catch (error) {
    throw new Error('Failed to update booking status');
  }
};

import { MutationResolvers } from '../../../generated';
import { bookingModel } from '../../../models';

export const createBooking: MutationResolvers['createBooking'] = async (_: unknown, { input }) => {
  try {
    await bookingModel.create(input);
    return { success: true, message: 'Successfully created booking' };
  } catch (error) {
    return { success: false, message: 'Failed to create booking' };
  }
};

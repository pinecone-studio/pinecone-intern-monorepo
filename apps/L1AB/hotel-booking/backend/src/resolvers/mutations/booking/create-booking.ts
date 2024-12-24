import { MutationResolvers } from '../../../generated';
import { bookingModel } from '../../../models';

export const createBooking: MutationResolvers['createBooking'] = async (_: unknown, { input }) => {
  try {
    if (input?.isPaid === true) {
      await bookingModel.create(input);
      return { success: true, message: 'Successfully created booking' };
    } else return { success: false, message: 'Payment is required to complete the booking.' };
  } catch (error) {
    return { success: false, message: 'Failed to create booking' };
  }
};

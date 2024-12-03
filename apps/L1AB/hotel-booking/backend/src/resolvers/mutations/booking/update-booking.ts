import { MutationResolvers } from '../../../generated';
import { bookingModel } from '../../../models';

export const updateBooking: MutationResolvers['updateBooking'] = async (_: unknown, { input }) => {
  try {
    await bookingModel.findByIdAndUpdate(input._id, input);
    return { success: true, message: 'Successfully updated booking' };
  } catch (error) {
    return { success: false, message: 'Failed to update booking' };
  }
};

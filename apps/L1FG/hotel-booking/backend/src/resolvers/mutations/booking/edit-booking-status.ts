import { BookingModel } from '../../../models';
import { MutationResolvers } from '../../../generated';

export const editBookingStatus: MutationResolvers['editBookingStatus'] = async (_, { input }) => {
  const { id, status } = input;
  const editBooking = await BookingModel.findByIdAndUpdate({ id }, { status }, { new: true });
  if (!editBooking) {
    return [];
  }
  return editBooking;
};

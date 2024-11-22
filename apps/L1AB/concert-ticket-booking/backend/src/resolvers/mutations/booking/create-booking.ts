import { MutationResolvers } from '../../../generated';
import { bookingModel } from '../../../models';

export const createBooking: MutationResolvers['createBooking'] = async (_, { input }) => {
  const cancel = await bookingModel.create(input);
  return cancel;
};

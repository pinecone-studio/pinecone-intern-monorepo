import { MutationResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const updateHotel: MutationResolvers['updateHotel'] = async (_: unknown, { input }) => {
  try {
    const response = await hotelModel.findByIdAndUpdate(input._id, input, { new: true });
    return response;
  } catch (error) {
    throw new Error('Failed to update hotel');
  }
};

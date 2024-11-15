import { MutationResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const updateHotel: MutationResolvers['updateHotel'] = async (_: unknown, { input }) => {
  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(input._id, input, { new: true });
    return updatedHotel;
  } catch (error) {
    throw new Error('Failed to update hotel');
  }
};

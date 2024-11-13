import { MutationResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const deleteHotel: MutationResolvers['deleteHotel'] = async (_: unknown, { _id }) => {
  try {
    const response = await hotelModel.findByIdAndDelete(_id);
    return response;
  } catch (error) {
    throw new Error('Failed to delete hotel');
  }
};

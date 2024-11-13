import { QueryResolvers } from '../../../generated';
import { hotelModel } from '../../../models';

export const getHotelById: QueryResolvers['getHotelById'] = async (_: unknown, { _id }) => {
  try {
    const hotel = await hotelModel.findById(_id);
    return hotel;
  } catch (error) {
    throw new Error('Failed to get hotel by id');
  }
};

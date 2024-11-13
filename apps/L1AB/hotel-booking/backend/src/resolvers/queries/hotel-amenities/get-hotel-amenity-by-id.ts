import { QueryResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const getHotelAmenityById: QueryResolvers['getHotelAmenityById'] = async (_: unknown, { _id }) => {
  try {
    const response = await hotelAmenitiesModel.findById(_id);
    return response;
  } catch (error) {
    throw new Error('Failed to get hotel amenity by id');
  }
};

import { QueryResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const getHotelAmenityById: QueryResolvers['getHotelAmenityById'] = async (_: unknown, { _id }) => {
  try {
    const hotelAmenity = await hotelAmenitiesModel.findById(_id);
    return hotelAmenity;
  } catch (error) {
    throw new Error('Failed to get hotel amenity by id');
  }
};

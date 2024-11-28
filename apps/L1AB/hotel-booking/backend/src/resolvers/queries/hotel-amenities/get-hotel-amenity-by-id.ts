import { QueryResolvers } from '../../../generated';
import { hotelAmenitiesModel, hotelAmenitiesPopulatedType } from '../../../models';

export const getHotelAmenityById: QueryResolvers['getHotelAmenityById'] = async (_: unknown, { _id }) => {
  try {
    const hotelAmenity = await hotelAmenitiesModel.find({_id}).populate<hotelAmenitiesPopulatedType>(['hotelId', 'amenities']);
    return hotelAmenity.map(el => el.toObject())
  } catch (error) {
    throw new Error('Failed to get hotel amenity by id');
  }
};

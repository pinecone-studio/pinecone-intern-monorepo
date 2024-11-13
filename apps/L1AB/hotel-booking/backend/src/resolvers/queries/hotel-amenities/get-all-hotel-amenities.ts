import { QueryResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const getAllHotelAmenities: QueryResolvers['getAllHotelAmenities'] = async () => {
  try {
    const hotelAmenities = await hotelAmenitiesModel.find();
    return hotelAmenities;
  } catch (error) {
    throw new Error('Failed to get all hotel amenities');
  }
};

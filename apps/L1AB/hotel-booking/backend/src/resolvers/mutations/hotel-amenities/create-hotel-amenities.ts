import { MutationResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const createHotelAmenities: MutationResolvers['createHotelAmenities'] = async (_: unknown, { input }) => {
  try {
    const hotelAmenities = await hotelAmenitiesModel.create(input);
    return hotelAmenities;
  } catch (error) {
    throw new Error('Failed to create hotel amenities');
  }
};

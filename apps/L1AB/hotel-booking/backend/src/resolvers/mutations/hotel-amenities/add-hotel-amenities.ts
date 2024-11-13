import { MutationResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const createHotelAmenities: MutationResolvers['createHotelAmenities'] = async (_: unknown, { input }) => {
  try {
    const response = await hotelAmenitiesModel.create(input);
    return response;
  } catch (error) {
    throw new Error('Failed to create hotel amenities');
  }
};

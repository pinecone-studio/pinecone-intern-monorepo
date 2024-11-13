import { QueryResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const getAllAmenities: QueryResolvers['getAllAmenities'] = async () => {
  try {
    const amenities = await amenityModel.find();
    return amenities;
  } catch (error) {
    throw new Error('Error fetching all amenities');
  }
};

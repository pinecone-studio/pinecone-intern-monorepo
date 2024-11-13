import { QueryResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const getAmenityById: QueryResolvers['getAmenityById'] = async (_: unknown, { _id }) => {
  try {
    const amenity = await amenityModel.findById(_id);
    return amenity;
  } catch (error) {
    throw new Error('Failed to get amenity by id');
  }
};

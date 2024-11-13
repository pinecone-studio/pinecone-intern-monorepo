import { QueryResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const getAmenityById: QueryResolvers['getAmenityById'] = async (_: unknown, { _id }) => {
  const amenity = await amenityModel.findById(_id);

  if (!amenity) {
    throw new Error('Error fetching an amenity');
  }

  return amenity;
};

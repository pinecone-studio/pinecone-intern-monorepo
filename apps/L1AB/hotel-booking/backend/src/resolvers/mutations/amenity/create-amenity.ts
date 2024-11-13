import { MutationResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const createAmenity: MutationResolvers['createAmenity'] = async (_: unknown, { input }) => {
  try {
    const amenity = await amenityModel.create(input);
    return amenity;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error(`An amenity with the name "${input.name}" already exists.`);
    }
    throw new Error('Failed to create amenity');
  }
};

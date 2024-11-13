import { MutationResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const createAmenity: MutationResolvers['createAmenity'] = async (_: unknown, { input }) => {
  try {
    const response = await amenityModel.create(input);
    return response;
  } catch (error) {
    throw new Error('Failed to create amenity');
  }
};

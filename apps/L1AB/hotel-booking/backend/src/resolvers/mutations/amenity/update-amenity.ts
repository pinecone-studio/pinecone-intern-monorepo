import { MutationResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const updateAmenity: MutationResolvers['updateAmenity'] = async (_: unknown, { input }) => {
  try {
    const response = await amenityModel.findByIdAndUpdate(input._id, input, { new: true });
    return response;
  } catch (error) {
    throw new Error('Failed to update amenity');
  }
};

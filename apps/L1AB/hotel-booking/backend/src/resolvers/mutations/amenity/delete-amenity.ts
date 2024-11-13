import { MutationResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const deleteAmenity: MutationResolvers['deleteAmenity'] = async (_: unknown, { _id }) => {
  try {
    const response = await amenityModel.findByIdAndDelete(_id);
    return response;
  } catch (error) {
    throw new Error('Failed to delete amenity');
  }
};

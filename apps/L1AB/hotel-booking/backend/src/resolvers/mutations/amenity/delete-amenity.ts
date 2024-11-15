import { MutationResolvers } from '../../../generated';
import { amenityModel } from '../../../models';

export const deleteAmenity: MutationResolvers['deleteAmenity'] = async (_: unknown, { _id }) => {
  try {
    const deletedAmenity = await amenityModel.findByIdAndDelete(_id);
    return deletedAmenity;
  } catch (error) {
    throw new Error('Failed to delete amenity');
  }
};

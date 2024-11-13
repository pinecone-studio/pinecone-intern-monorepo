import { MutationResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const updateHotelAmenities: MutationResolvers['updateHotelAmenities'] = async (_: unknown, { input }) => {
  try {
    const response = await hotelAmenitiesModel.findByIdAndUpdate(input._id, input, { new: true });
    return response;
  } catch (error) {
    throw new Error('Failed to update hotel amenities');
  }
};

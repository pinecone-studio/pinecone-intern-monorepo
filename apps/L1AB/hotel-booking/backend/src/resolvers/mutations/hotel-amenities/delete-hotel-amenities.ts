import { MutationResolvers } from '../../../generated';
import { hotelAmenitiesModel } from '../../../models';

export const deleteHotelAmenities: MutationResolvers['deleteHotelAmenities'] = async (_: unknown, { _id }) => {
  try {
    const deletedHotelAmenities = await hotelAmenitiesModel.findByIdAndDelete({ _id: _id });
    return deletedHotelAmenities;
  } catch (error) {
    throw new Error('Failed to delete hotel amenities');
  }
};

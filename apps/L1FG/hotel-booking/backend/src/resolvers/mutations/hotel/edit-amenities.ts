import { MutationResolvers } from '../../../generated';
import { HotelModel } from '../../../models';

export const editAmenities: MutationResolvers['editAmenities'] = async (_, { input }) => {
  const { id, amenities } = input;
  const hotel = await HotelModel.findById(id);
  if (!hotel) {
    return new Error('Hotel Not Found');
  }
  const updatedHotel = await HotelModel.findByIdAndUpdate({ _id: id }, { amenities }, { new: true });
  return updatedHotel;
};

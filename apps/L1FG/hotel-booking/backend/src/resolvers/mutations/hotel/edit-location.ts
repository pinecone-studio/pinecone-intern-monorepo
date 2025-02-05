import { MutationResolvers } from '../../../generated';
import { HotelModel } from '../../../models';

export const editLocation: MutationResolvers['editLocation'] = async (_, { input }) => {
  const { id, location, locationName } = input;
  const hotel = await HotelModel.findById(id);
  if (!hotel) {
    return new Error('Hotel Not Found');
  }
  const updatedHotel = await HotelModel.findByIdAndUpdate({ _id: id }, { location, locationName }, { new: true });
  return updatedHotel;
};

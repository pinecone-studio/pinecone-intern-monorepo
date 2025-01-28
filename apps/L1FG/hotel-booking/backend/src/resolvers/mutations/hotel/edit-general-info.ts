import { MutationResolvers } from '../../../generated';
import { HotelModel } from '../../../models';

export const editGeneralInfo: MutationResolvers['editGeneralInfo'] = async (_, { input }) => {
  const { id, name, description, starRating, phoneNumber, rating } = input;
  const hotel = await HotelModel.findById({ _id: id });
  if (!hotel) {
    return new Error('Hotel Not Found');
  }
  const updatedHotel = await HotelModel.findByIdAndUpdate({ _id: id }, { name: name, description, starRating, phoneNumber, rating }, { new: true });
  return updatedHotel;
};

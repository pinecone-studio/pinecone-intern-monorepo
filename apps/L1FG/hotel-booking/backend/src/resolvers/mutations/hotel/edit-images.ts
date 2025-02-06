import { MutationResolvers } from '../../../generated';
import { HotelModel } from '../../../models';

export const editImages: MutationResolvers['editImages'] = async (_, { input }) => {
  const { id, images } = input;
  const hotel = await HotelModel.findById(id);
  if (!hotel) {
    return [];
  }

  const updatedHotel = await HotelModel.findByIdAndUpdate({ _id: id }, { images }, { new: true });
  return updatedHotel;
};

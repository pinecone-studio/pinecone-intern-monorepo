import { QueryResolvers } from '../../../generated';
import { HotelModel } from '../../../models';
import mongoose from 'mongoose';

export const getHotelById: QueryResolvers['getHotelById'] = async (_, { id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  const hotel = await HotelModel.findById(id);
  if (!hotel) {
    throw new Error('Hotel not found');
  }
  return hotel;
};

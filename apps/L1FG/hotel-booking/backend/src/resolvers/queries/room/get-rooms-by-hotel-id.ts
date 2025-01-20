import { QueryResolvers } from '../../../generated';
import { RoomModel } from '../../../models';
import mongoose from 'mongoose';

export const getRoomsByHotelId: QueryResolvers['getRoomsByHotelId'] = async (_, { hotelId }) => {
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    throw new Error('Invalid ID format');
  }

  const rooms = await RoomModel.find({ hotelId: hotelId });
  if (rooms.length === 0) {
    return [];
  }
  return rooms;
};

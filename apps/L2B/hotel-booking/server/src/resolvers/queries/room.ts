import { QueryResolvers } from '../../generated';
import { roomModel } from '../../models';

export const rooms: QueryResolvers['rooms'] = async () => {
  return await roomModel.find().populate('hotelId');
};

export const room: QueryResolvers['room'] = async (_, { id }) => {
  const found = await roomModel.findById(id).populate('hotelId');
  if (!found) throw new Error('Room not found.');
  return found;
};

export const roomsByHotel: QueryResolvers['roomsByHotel'] = async (_, { hotelId }) => {
  return await roomModel.find({ hotelId }).populate('hotelId');
};

import { QueryResolvers } from '../../generated';
import { roomModel } from '../../models';

export const rooms: QueryResolvers['rooms'] = async () => {
  return await roomModel.find();
};

export const room: QueryResolvers['room'] = async (_, { id }) => {
  const found = await roomModel.findById(id);
  if (!found) throw new Error('Room not found.');
  return found;
};

export const roomsByHotel: QueryResolvers['roomsByHotel'] = async (_, { hotelId }) => {
  const rooms = await roomModel.find({ hotelId });
  return rooms;
};

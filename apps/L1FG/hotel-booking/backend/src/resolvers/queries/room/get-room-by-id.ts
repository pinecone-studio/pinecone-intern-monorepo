import { QueryResolvers } from '../../../generated';
import mongoose from 'mongoose';
import { RoomModel } from '../../../models';

export const getRoomById: QueryResolvers['getRoomById'] = async (_, { id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }
  const room = await RoomModel.findById(id);

  if (!room) {
    throw new Error('Room not found');
  }
  return room;
};

import { roomModel, roomPopulatedType } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getAllRooms: QueryResolvers['getAllRooms'] = async () => {
  try {
    const allRooms = await roomModel.find().populate<roomPopulatedType>('hotelId');
    return allRooms.map((allRoom) => allRoom.toObject());
  } catch (error) {
    throw new Error('Failed to get rooms');
  }
};

import { roomModel, roomPopulatedType } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getRoomById: QueryResolvers['getRoomById'] = async (_, { _id }) => {
  try {
    const room = await roomModel.find({_id}).populate<roomPopulatedType>('hotelId');
    return room.map((el) => el.toObject());;
  } catch (error) {
    throw new Error('Failed to get room by id');
  }
};

import { roomModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getRoomById: QueryResolvers['getRoomById'] = async (_, { _id }) => {
  try {
    const room = await roomModel.findById(_id);
    return room;
  } catch (error) {
    throw new Error('Failed to get room by id');
  }
};

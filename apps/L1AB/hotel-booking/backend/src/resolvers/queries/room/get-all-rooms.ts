import { roomModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getAllRooms: QueryResolvers['getAllRooms'] = async () => {
  try {
    const allRooms = await roomModel.find();
    return allRooms;
  } catch (error) {
    throw new Error('Failed to get all rooms');
  }
};

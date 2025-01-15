import { QueryResolvers } from '../../../generated';
import { RoomModel } from '../../../models';

export const getRooms: QueryResolvers['getRooms'] = async () => {
  const rooms = await RoomModel.find();
  return rooms;
};

import { MutationResolvers } from '../../../generated';
import { RoomModel } from '../../../models';

export const editRoomGeneralInfo: MutationResolvers['editRoomGeneralInfo'] = async (_, { input }) => {
  const { id, name, type, price, roomInfo, bed, tax, roomNumber } = input;
  const room = await RoomModel.findById(id);
  if (!room) {
    return [];
  }
  const updatedRoom = await RoomModel.findByIdAndUpdate({ _id: id }, { name, tax, price, type, roomInfo, bed, roomNumber }, { new: true });
  return updatedRoom;
};

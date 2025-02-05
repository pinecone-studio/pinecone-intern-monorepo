import { RoomModel } from '../../../models';
import { MutationResolvers } from '../../../generated';

export const editRoomImages: MutationResolvers['editRoomImages'] = async (_, { input }) => {
  const { id, images } = input;
  const room = await RoomModel.findById(id);
  if (!room) {
    return [];
  }
  const updatedRoom = await RoomModel.findByIdAndUpdate({ _id: id }, { images }, { new: true });
  return updatedRoom;
};

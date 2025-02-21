import { RoomModel } from '../../../models';
import { MutationResolvers } from '../../../generated';

export const editRoomServices: MutationResolvers['editRoomServices'] = async (_, { input }) => {
  const { id, bathroom, accessibility, internet, foodAndDrink, bedroom, other } = input;
  const room = await RoomModel.findById(id);
  if (!room) {
    return [];
  }
  const updatedRoom = await RoomModel.findByIdAndUpdate({ _id: id }, { bathroom, accessibility, internet, foodAndDrink, bedroom, other }, { new: true });
  return updatedRoom;
};

import { roomModel } from '../../../models';
import { MutationResolvers } from '../../../generated';

export const deleteRoom: MutationResolvers['deleteRoom'] = async (_, { _id }) => {
  try {
    const deletedRoom = await roomModel.findByIdAndDelete({ _id: _id });
    return deletedRoom;
  } catch (error) {
    throw new Error('Room not found');
  }
};

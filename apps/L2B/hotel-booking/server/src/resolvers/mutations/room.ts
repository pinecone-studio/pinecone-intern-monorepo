import { MutationResolvers } from '../../generated';
import { roomModel } from '../../models';

export const createRoom: MutationResolvers['createRoom'] = async (_, { input }) => {
  try {
    const newRoom = await roomModel.create(input);
    const roomObj = newRoom.toObject();
    return {
      ...roomObj,
      id: roomObj._id,
    };
  } catch (error) {
    throw new Error('Failed to create room: ');
  }
};

export const updateRoom: MutationResolvers['updateRoom'] = async (_, { id, input }) => {
  const updatedRoom = await roomModel.findByIdAndUpdate(id, input, { new: true });
  if (!updatedRoom) throw new Error('Room not found.');
  return updatedRoom;
};

export const deleteRoom: MutationResolvers['deleteRoom'] = async (_, { id }) => {
  const deleted = await roomModel.findByIdAndDelete(id);
  if (!deleted) throw new Error('Room not found.');

  return {
    success: true,
    message: 'Room deleted successfully.',
  };
};

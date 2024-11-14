import { MutationResolvers } from '../../../generated';
import { roomModel } from '../../../models';

export const createRoom: MutationResolvers['createRoom'] = async (_: unknown, { input }) => {
  try {
    const newRoom = await roomModel.create(input);
    return newRoom;
  } catch (error) {
    throw new Error('Failed to add room');
  }
};

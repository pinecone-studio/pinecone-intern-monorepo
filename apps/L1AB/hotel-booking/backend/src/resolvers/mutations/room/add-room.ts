import { MutationResolvers } from '../../../generated';
import { roomModel } from '../../../models';

export const addRoom: MutationResolvers['addRoom'] = async (_: unknown, { input }) => {
  try {
    const newRoom = await roomModel.create(input);
    return newRoom;
  } catch (error) {
    throw new Error('Failed to add room');
  }
};

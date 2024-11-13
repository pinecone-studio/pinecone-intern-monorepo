import { roomModel } from '../../../models';
import { MutationResolvers } from '../../../generated/index';

export const updateRoom: MutationResolvers['updateRoom'] = async (_, { input }) => {
  try {
    const updatedRoom = await roomModel.findByIdAndUpdate(input._id, input, { new: true });
    return updatedRoom;
  } catch (error) {
    throw new Error(`Failed to update room`);
  }
};

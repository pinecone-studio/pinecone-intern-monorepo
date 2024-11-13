import { roomModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getRoomById: QueryResolvers['getRoomById'] = async (_, { _id }) => {
  try {
    const author = await roomModel.findById(_id);
    return author;
  } catch (error) {
    throw new Error('Failed to get room by Id');
  }
};

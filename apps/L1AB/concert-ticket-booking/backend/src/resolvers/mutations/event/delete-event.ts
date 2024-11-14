import { MutationResolvers } from '../../../generated';
import { EventModel } from '../../../models';

export const deleteEvent: MutationResolvers['deleteEvent'] = async (_, { _id }) => {
  const result = await EventModel.findByIdAndDelete({ _id });
  if (!result) {
    throw new Error('Event not deleted');
  }
  return result;
};

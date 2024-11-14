import { QueryResolvers } from '../../../generated';
import { EventModel } from '../../../models';

export const getEventById: QueryResolvers['getEventById'] = async (_, { _id }) => {
  const event = await EventModel.findById(_id);

  if (!event) throw new Error('Event not found');

  return event;
};

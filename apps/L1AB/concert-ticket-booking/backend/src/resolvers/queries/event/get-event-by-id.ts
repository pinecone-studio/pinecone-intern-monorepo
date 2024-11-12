import { QueryResolvers } from '../../../generated';
import { EventModel, EventPopulatedType } from '../../../models';

export const getEventById: QueryResolvers['getEventById'] = async (_, { _id }) => {
  const event = await EventModel.findById(_id).populate<EventPopulatedType>('venues');

  if (!event) throw new Error('Event not found');

  return event as EventPopulatedType;
};

import { MutationResolvers } from '../../../generated';
import { EventModel } from '../../../models';

export const createEvent: MutationResolvers['createEvent'] = async (_, { input }) => {
  const addevent = await EventModel.create(input);
  return addevent;
};

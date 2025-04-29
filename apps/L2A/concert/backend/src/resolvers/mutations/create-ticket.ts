import { MutationResolvers } from '../../generated';
import { ticketModel } from '../../models';

export const createTicket: MutationResolvers['createTicket'] = async (_, { concert, seatNumber, price, type, Status }) => {
  const newTicket = await ticketModel.create({ concert, seatNumber, price, type, Status });
  return newTicket;
};

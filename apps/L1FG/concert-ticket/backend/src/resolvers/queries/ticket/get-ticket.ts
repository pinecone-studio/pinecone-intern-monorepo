import { QueryResolvers } from '../../../generated';
import { TicketModel } from '../../../models/ticket.model';

export const getTicket: QueryResolvers['getTicket'] = async (_: unknown, { ticketNumber }) => {
  const findTicket = await TicketModel.findOne({ ticketNumber });
  if (!findTicket) throw new Error('ticket not found');
  return findTicket;
};

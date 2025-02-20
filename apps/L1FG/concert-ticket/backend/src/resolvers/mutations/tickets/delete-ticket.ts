import { MutationResolvers } from '../../../generated';
import { TicketModel } from '../../../models/ticket.model';

export const deleteTicket: MutationResolvers['deleteTicket'] = async (_: unknown, { ticketID }) => {
  const ticket = await TicketModel.findByIdAndDelete({ _id: ticketID });
  if (!ticket) throw new Error('Концерт байхгүй байна');
  return ticket;
};

import { TicketModel } from '../../../models/ticket.model';
import { MutationResolvers } from '../../../generated';

export const createTicket: MutationResolvers['createTicket'] = async (_: unknown, { input }) => {
  const { vipTicket, standartTicket, standingAreaTicket, concertID, ticketNumber } = input;
  const ticket = await TicketModel.create({ vipTicket, standartTicket, standingAreaTicket, concertID, ticketNumber });
  return ticket;
};

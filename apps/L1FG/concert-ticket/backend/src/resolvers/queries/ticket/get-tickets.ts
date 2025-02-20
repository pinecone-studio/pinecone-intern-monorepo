import { QueryResolvers } from '../../../generated';
import { TicketModel } from '../../../models/ticket.model';

export const getTickets: QueryResolvers['getTickets'] = async () => {
  const tickets = await TicketModel.find();
  if (!tickets) throw new Error('Тасалбар олдсонгүй');
  return tickets;
};

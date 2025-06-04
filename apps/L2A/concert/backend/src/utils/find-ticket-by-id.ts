import { Ticket } from '../generated';
import { ticketModel } from '../models';

export const findTicketById = async (id: string): Promise<Ticket> => {
  const ticket = await ticketModel.findById(id);
  if (!ticket) {
    throw new Error('Тасалбар олдсонгүй!');
  }
  return ticket;
};

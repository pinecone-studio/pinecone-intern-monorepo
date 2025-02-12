import { QueryResolvers } from '../../../generated';
import { ConcertModel, OrderModel, TicketModel } from '../../../models';

export const getOrderTicketNumber: QueryResolvers['getOrderTicketNumber'] = async (_: unknown, { ticketNumber }) => {
  const order = await OrderModel.findOne({ ticketNumber });
  if (!order) {
    const ticket = await TicketModel.findOne({ ticketNumber });
    const updateOperations: Record<string, number> = {};
    updateOperations['vipTicket.quantity'] = ticket.vipTicket;
    updateOperations['regularTicket.quantity'] = ticket.standartTicket;
    updateOperations['standingAreaTicket.quantity'] = ticket.standingAreaTicket;

    await ConcertModel.findByIdAndUpdate({ _id: ticket.concertID }, { $inc: updateOperations }, { new: true });
    await TicketModel.findOneAndDelete({ ticketNumber: ticketNumber });

    throw new Error('Захиалга баталгаажуулаагүй тул тасалбарыг цуцаллаа');
  }
  return order;
};

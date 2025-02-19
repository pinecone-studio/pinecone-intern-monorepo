import { MutationResolvers } from '../../../generated';
import { ConcertModel, OrderModel, TicketModel } from '../../../models';

export const deleteOrder: MutationResolvers['deleteOrder'] = async (_: unknown, { id }) => {
  const order = await OrderModel.findById({ _id: id });
  if (!order) throw new Error('concert not found');

  const ticket = await TicketModel.findOne({ ticketNumber: order.ticketNumber });
  const updateOperations: Record<string, number> = {};
  updateOperations['vipTicket.quantity'] = ticket.vipTicket;
  updateOperations['regularTicket.quantity'] = ticket.standartTicket;
  updateOperations['standingAreaTicket.quantity'] = ticket.standingAreaTicket;

  await ConcertModel.findByIdAndUpdate({ _id: order.concertID }, { $inc: updateOperations });

  await TicketModel.findOneAndDelete({ ticketNumber: order.ticketNumber });

  const deletedOrder = await OrderModel.findByIdAndDelete({ _id: id });

  return deletedOrder;
};

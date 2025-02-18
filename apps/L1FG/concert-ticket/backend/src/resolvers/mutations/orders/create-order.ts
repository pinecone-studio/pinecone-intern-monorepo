import { MutationResolvers } from '../../../generated';
import { OrderModel } from '../../../models';

export const createOrder: MutationResolvers['createOrder'] = async (_: unknown, { input }) => {
  const { userID, concertID, ticketID, phoneNumber, email, totalPrice, paymentType, ticketNumber, vipTicket, regularTicket, standingAreaTicket, orderStatus } = input;
  const order = await OrderModel.create({ userID, ticketID, concertID, phoneNumber, email, totalPrice, paymentType, ticketNumber, vipTicket, regularTicket, standingAreaTicket, orderStatus });
  return order;
};

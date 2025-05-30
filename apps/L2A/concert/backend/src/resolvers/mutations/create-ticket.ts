import { MutationResolvers } from '../../generated';
import { seatModel, ticketModel } from '../../models';
import { convertTickets } from '../../utils/convert-ticket';
import { findSeatById } from '../../utils/get-seat-by-id';

export const createTicketOrder: MutationResolvers['createTicketOrder'] = async (_, { input }) => {
  const { seatDataId, tickets, userId, concertId, totalPrice } = input;

  const seat = await findSeatById(seatDataId);
  const ticketMap = convertTickets(tickets);

  const updatedFields = {
    'seats.VIP.availableTickets': seat.seats.VIP.availableTickets - ticketMap.VIP.count,
    'seats.Standard.availableTickets': seat.seats.Standard.availableTickets - ticketMap.Standard.count,
    'seats.Backseat.availableTickets': seat.seats.Backseat.availableTickets - ticketMap.Backseat.count,
  };

  await seatModel.findByIdAndUpdate(seatDataId, { $set: updatedFields }, { new: true });
  const createdTicket = await ticketModel.create({
    user: userId,
    concert: concertId,
    totalPrice: totalPrice,
    ticket: ticketMap,
  });
  return {
    tickets: createdTicket,
    totalPrice,
  };
};

import { MutationResolvers } from '../../generated';
import { RequestModel } from '../../models/request.model';
import { catchError } from '../../utils/catch-error';
import { findTicketById } from '../../utils/find-ticket-by-id';
import { findUserById } from '../../utils/find-user-by-id';

export const createCancelRequest: MutationResolvers['createCancelRequest'] = async (_, { userId, ticketId, bankName, accountNumber, bankOwnerName }) => {
  try {
    const ticket = await findTicketById(ticketId);
    await findUserById(userId);
    const existingRequest = await RequestModel.findOne({ user: userId, ticket: ticketId, status: 'PENDING' });
    if (existingRequest) {
      throw new Error('Аль хэдий нь хүсэлт гаргасан байна!');
    }
    if (ticket.user.toString() !== userId) {
      throw new Error('Тасалбарын эзэн биш байна!');
    }
    const newRequest = await RequestModel.create({ concert: ticket.concert, user: userId, ticket: ticket.id, bankName, accountNumber, bankOwnerName });
    return newRequest;
  } catch (err) {
    catchError(err);
  }
};

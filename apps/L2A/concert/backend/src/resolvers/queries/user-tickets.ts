import { ticketModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const userTickets = async (_: any, { userId }: { userId: string }) => {
  try {
    const tickets = await ticketModel.find({ user: userId }).populate('concert').exec();

    return tickets;
  } catch (err) {
    return catchError(err);
  }
};

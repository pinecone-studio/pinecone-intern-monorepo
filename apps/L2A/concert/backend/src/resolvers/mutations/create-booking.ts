import { MutationResolvers } from '../../generated';
import { bookingsModel } from '../../models/booking.model';
import { catchError } from '../../utils/catch-error';
import { validateConcert } from '../../utils/create-booking/validate-concert';
import { validateTickets } from '../../utils/create-booking/validate-tickets';
import { validateUser } from '../../utils/create-booking/validate-user';

export const createBooking: MutationResolvers['createBooking'] = async (_, { input, ticketIds }) => {
  const { userId, concertId } = input;

  try {
    await validateUser(userId);
    await validateConcert(concertId);
    await validateTickets(ticketIds);

    const booking = await bookingsModel.create({
      user: userId,
      concert: concertId,
      tickets: ticketIds,
      totalAmount: 0,
      status: 'PENDING',
    });
    const populatedBooking = await bookingsModel.findById(booking.id).populate('tickets').populate('concert').exec();
    return populatedBooking;
  } catch (error) {
    catchError(error);
  }
};

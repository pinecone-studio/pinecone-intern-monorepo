import { MutationResolvers } from '../../generated';
import { concertModel } from '../../models/concert.model';
import { venueModel } from '../../models/venue.model';
import { catchError } from '../../utils/catch-error';

export const createConcert: MutationResolvers['createConcert'] = async (_, { title, description, venueId, artistName, specialGuestName, ticketCategories }) => {
  try {
    const venue = await venueModel.findById(venueId);
    if (!venue) {
      throw new Error('Venue not found');
    }

    const concert = await concertModel.create({
      title,
      description,
      venue,
      artistName,
      specialGuestName,
      ticketCategories,
    });

    return concert;
  } catch (error) {
    catchError(error);
  }
};

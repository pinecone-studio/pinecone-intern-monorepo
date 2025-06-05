import { QueryResolvers } from '../../generated';
import { concertModel } from '../../models/concert.model';
import { catchError } from '../../utils/catch-error';
import { normalizeConcert } from '../../utils/get-concert/normalize-concert';

export const concert: QueryResolvers['concert'] = async (_, { concertId }) => {
  try {
    const concert = await concertModel.findById(concertId).populate('venue').populate('seatData').exec();

    if (!concert) {
      throw new Error('Тоглолт олдсонгүй.');
    }
    return normalizeConcert(concert);
  } catch (error) {
    throw catchError(error);
  }
};

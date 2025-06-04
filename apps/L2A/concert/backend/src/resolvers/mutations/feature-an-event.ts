import { MutationResolvers } from '../../generated';
import { concertModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const featureAnEvent: MutationResolvers['featureAnEvent'] = async (_, { concertId }) => {
  try {
    const concert = await concertModel.findById(concertId);
    if (!concert) {
      throw new Error('Концерт олдсонгүй!');
    }
    const UpdateConcert = await concertModel.findByIdAndUpdate(concert.id, { featured: !concert.featured });

    return UpdateConcert;
  } catch (err) {
    catchError(err);
  }
};

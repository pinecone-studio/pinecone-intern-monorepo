import { QueryResolvers } from '../../generated';
import { concertModel } from '../../models/concert.model';
import { catchError } from '../../utils/catch-error';

export const concert: QueryResolvers['concert'] = async (_, { concertId }) => {
  try {
    const concert = await concertModel.findById(concertId).populate('venue').exec();
    return concert;
  } catch (error) {
    catchError(error);
  }
};

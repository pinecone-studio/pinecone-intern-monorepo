import { QueryResolvers } from '../../generated';
import { concertModel } from '../../models/concert.model';
import { catchError } from '../../utils/catch-error';

export const concertQuery: QueryResolvers['concert'] = async () => {
  try {
    const concert = await concertModel.findOne().populate('venue').exec();
    return concert;
  } catch (error) {
    catchError(error);
  }
};

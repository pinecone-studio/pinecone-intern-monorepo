import { concertModel } from '../../models/concert.model';
import { catchError } from '../../utils/catch-error';

export const concerts = async () => {
  try {
    const concerts = await concertModel.find();
    if (!concerts) {
      throw new Error('Concert not found');
    }
    return concerts;
  } catch (error) {
    return catchError(error);
  }
};

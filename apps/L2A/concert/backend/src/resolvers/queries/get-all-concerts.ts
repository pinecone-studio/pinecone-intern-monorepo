import { concertModel } from '../../models/concert.model';
import { catchError } from '../../utils/catch-error';

export const concerts = async () => {
  try {
    const concerts = await concertModel.find().populate('venue').populate('seatData').sort({ date: -1 });
    if (!concerts) {
      throw new Error('Тоглолт олдсонгүй.');
    }
    return concerts;
  } catch (error) {
    return catchError(error);
  }
};

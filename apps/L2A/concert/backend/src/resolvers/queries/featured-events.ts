import { concertModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const featuredEvents = async () => {
  try {
    const featuredEvents = await concertModel.find({ featured: true }).populate('venue').populate('seatData').exec();
    return featuredEvents;
  } catch (err) {
    return catchError(err);
  }
};

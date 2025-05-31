import { MutationResolvers } from '../../generated';
import { concertModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const updateEventInfo: MutationResolvers['updateEventInfo'] = async (_, { concertId, title, description, artistName }) => {
  try {
    const concert = await concertModel.findById(concertId);
    if (!concert) {
      throw new Error('Концерт олдсонгүй!');
    }
    const updatedEvent = await concertModel.findByIdAndUpdate(concert.id, { title, description, artistName }, { new: true });
    return updatedEvent;
  } catch (err) {
    catchError(err);
  }
};

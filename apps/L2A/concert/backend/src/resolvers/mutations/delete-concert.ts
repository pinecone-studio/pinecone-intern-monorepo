import { MutationResolvers } from '../../generated';
import { concertModel } from '../../models';
import { catchError } from '../../utils/catch-error';

export const deleteEvent: MutationResolvers['deleteEvent'] = async (_, { id }) => {
  try {
    const event = await concertModel.findById(id);
    if (!event) {
      throw new Error('Концерт олдсонгүй!');
    }
    const deletedEvent = await concertModel.findByIdAndDelete(id);
    console.log(deletedEvent);
    return deletedEvent;
  } catch (err) {
    catchError(err);
  }
};

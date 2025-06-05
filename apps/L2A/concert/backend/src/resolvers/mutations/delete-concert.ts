import { MutationResolvers } from '../../generated';
import { concertModel, ticketModel } from '../../models';
import { RequestModel } from '../../models/request.model';
import { catchError } from '../../utils/catch-error';

export const deleteEvent: MutationResolvers['deleteEvent'] = async (_, { id }) => {
  try {
    const event = await concertModel.findById(id);

    if (!event) {
      throw new Error('Концерт олдсонгүй!');
    }
    await ticketModel.deleteMany({ concert: id });
    await RequestModel.deleteMany({ concert: id });
    const deletedEvent = await concertModel.findByIdAndDelete(id);
    return deletedEvent;
  } catch (err) {
    catchError(err);
  }
};

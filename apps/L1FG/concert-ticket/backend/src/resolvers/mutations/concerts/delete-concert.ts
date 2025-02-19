import { MutationResolvers } from '../../../generated';
import { ConcertModel } from '../../../models';

export const deleteConcert: MutationResolvers['deleteConcert'] = async (_: unknown, { _id }) => {
  const concert = await ConcertModel.findByIdAndDelete({ _id: _id });
  if (!concert) throw new Error('Концерт олдсонгүй');
  return concert;
};

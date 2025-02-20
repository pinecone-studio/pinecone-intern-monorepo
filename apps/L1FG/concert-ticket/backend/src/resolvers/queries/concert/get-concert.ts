import { QueryResolvers } from '../../../generated';
import { ConcertModel } from '../../../models';

export const getConcert: QueryResolvers['getConcert'] = async (_: unknown, { _id }) => {
  const concert = await ConcertModel.findById({ _id });

  if (!concert) throw new Error('Тоглолт байхгүй байна');

  return concert;
};

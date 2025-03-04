import { ConcertModel } from '../../../models';
import { QueryResolvers } from '../../../generated';

export const getConcerts: QueryResolvers['getConcerts'] = async () => {
  const concerts = await ConcertModel.find().sort({ createdAt: -1 });
  return concerts;
};

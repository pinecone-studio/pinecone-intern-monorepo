import { QueryResolvers } from '../../../generated';
import { ConcertModel } from '../../../models';

export const getSameConcerts: QueryResolvers['getSameConcerts'] = async (_: unknown, { concertId }) => {
  const concert = await ConcertModel.findById({ _id: concertId });

  const sameConcerts = await ConcertModel.find({
    $or: [{ concertDay: { $gte: concert.concertDay } }, { artistName: concert.artistName }, { concertTime: concert.concertTime }],
  });

  if (!sameConcerts) throw new Error('Холбоотой эвент болон тоглолтууд байхгүй байна.');

  return sameConcerts;
};


import { MutationResolvers } from '../../../generated';
import { ConcertModel } from '../../../models';

export const createConcert: MutationResolvers['createConcert'] = async (_: unknown, { input }) => {
  const { concertName, concertPlan, artistName, concertDay, concertTime, concertPhoto, vipTicket, regularTicket, standingAreaTicket } = input;
  try {
    const concert = await ConcertModel.create({ concertName, concertPlan, artistName, concertDay, concertTime, concertPhoto, vipTicket, regularTicket, standingAreaTicket });
    return concert;
  } catch (error) {
    return new Error('error');
  }
};

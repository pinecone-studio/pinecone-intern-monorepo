import { MutationResolvers } from '../../../generated';
import { ConcertModel } from '../../../models';

export const editConcert: MutationResolvers['editConcert'] = async (_: unknown, { input }) => {
  const { id, concertName, artists, concertDay, concertTime, vipTicket, regularTicket, standingAreaTicket, concertPlan } = input;

  const editConcert = await ConcertModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        concertName,
        artistName: artists,
        concertDay,
        concertTime,
        vipTicket,
        regularTicket,
        standingAreaTicket,
        concertPlan,
      },
    },
    { new: true }
  );

  return editConcert;
};

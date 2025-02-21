import { editConcert } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/concert.model.ts', () => ({
  ConcertModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValueOnce({
        _id: 1,
        concertName: 'mm',
        concertPlan: 'dvc',
        artistName: ['dfsvsdv'],
        concertDay: 436,
        concertTime: 'fdg',

        vipTicket: {},
        regularTicket: {},
        standingAreaTicket: {},
      })
      .mockResolvedValueOnce(new Error('Not found concert')),
  },
}));

describe('edit concert', () => {
  it('edit concert successfull', async () => {
    const VipTicketInput = { price: 43, quantity: 64 };
    const RegularTicketInput = { price: 43, quantity: 64 };
    const StandingAreaTicketInput = { price: 43, quantity: 64 };
    const result = await editConcert!(
      {},
      {
        input: {
          id: '1',
          concertName: 'mm',
          concertPlan: 'dvc',
          artists: ['dfsvsdv'],
          concertDay: '436',
          concertTime: 'fdg',

          vipTicket: VipTicketInput,
          regularTicket: RegularTicketInput,
          standingAreaTicket: StandingAreaTicketInput,
        },
      },
      {},
      {} as GraphQLResolveInfo
    );
    expect(result).toEqual({
      _id: 1,
      concertName: 'mm',
      concertPlan: 'dvc',
      artistName: ['dfsvsdv'],
      concertDay: 436,
      concertTime: 'fdg',

      vipTicket: {},
      regularTicket: {},
      standingAreaTicket: {},
    });
  });
});

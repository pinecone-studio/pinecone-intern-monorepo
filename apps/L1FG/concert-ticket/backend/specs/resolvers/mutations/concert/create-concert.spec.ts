import { createConcert } from '../../../../src/resolvers/mutations';

import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  ConcertModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        _id: 1,
        concertName: 'mm',
        concertPlan: 'dv',
        artistName: ['dfsvsdv'],
        concertDay: 436,
        concertTime: 'fdg',
        concertPhoto: 'fsg',
        vipTicket: {},
        regularTicket: {},
        standingAreaTicket: {},
      })
      .mockRejectedValueOnce(new Error('error')),
  },
}));

describe('create concert', () => {
  it(' should create concert', async () => {
    const VipTicketInput = { price: 43, quantity: 64 };
    const RegularTicketInput = { price: 43, quantity: 64 };
    const StandingAreaTicketInput = { price: 43, quantity: 64 };
    const result = await createConcert!(
      {},
      {
        input: {
          concertName: 'mm',
          concertPlan: 'dv',
          artistName: ['dfsvsdv'],
          concertDay: 436,
          concertTime: 'fdg',
          concertPhoto: 'fsg',
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
      concertPlan: 'dv',
      artistName: ['dfsvsdv'],
      concertDay: 436,
      concertTime: 'fdg',
      concertPhoto: 'fsg',
      vipTicket: {},
      regularTicket: {},
      standingAreaTicket: {},
    });
  });
  it('should not create concert', async () => {
    const VipTicketInput = { price: 43, quantity: 64 };
    const RegularTicketInput = { price: 43, quantity: 64 };
    const StandingAreaTicketInput = { price: 43, quantity: 64 };

    try {
      await createConcert!(
        {},
        {
          input: {
            concertName: 'mm',
            concertPlan: 'dv',
            artistName: ['dfsvsdv'],
            concertDay: 436,
            concertTime: 'fdg',
            concertPhoto: 'fsg',
            vipTicket: VipTicketInput,
            regularTicket: RegularTicketInput,
            standingAreaTicket: StandingAreaTicketInput,
          },
        },
        {},
        {} as GraphQLResolveInfo
      );
    } catch (error) {
      expect(error).toEqual(new Error('error'));
    }
  });
});

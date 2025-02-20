/* eslint-disable no-secrets/no-secrets */
import { ConcertModel } from 'apps/L1FG/concert-ticket/backend/src/models';
import { getSameConcerts } from 'apps/L1FG/concert-ticket/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('apps/L1FG/concert-ticket/backend/src/models/concert.model.ts', () => ({
  ConcertModel: {
    findById: jest.fn().mockResolvedValue({
      _id: '1',
      concertName: "Drake's concert",
      concertPlan: 'amazing show',
      artistName: ['Drake'],
      concertDay: '2025-02-20T10:52:36.706Z',
      concertTime: '00:00',
      concertPhoto: 'https://res.cloudinary.com/do5xczpqa/image/upload/v1740048765/czzfvcjmud0wohtultux.jpg',
      vipTicket: {
        price: 534,
        quantity: 7650,
      },
      regularTicket: {
        price: 567,
        quantity: 54367,
      },
      standingAreaTicket: {
        price: 354,
        quantity: 54,
      },
    }),
    find: jest
      .fn()
      .mockResolvedValueOnce([
        {
          _id: '1',
          concertName: "Drake's concert",
          concertPlan: 'amazing show',
          artistName: ['Drake'],
          concertDay: '2025-02-20T10:52:36.706Z',
          concertTime: '00:00',
          concertPhoto: 'https://res.cloudinary.com/do5xczpqa/image/upload/v1740048765/czzfvcjmud0wohtultux.jpg',
          vipTicket: {
            price: 534,
            quantity: 7650,
          },
          regularTicket: {
            price: 567,
            quantity: 54367,
          },
          standingAreaTicket: {
            price: 354,
            quantity: 54,
          },
        },
      ])
      .mockResolvedValueOnce(null),
  },
}));
describe('get same concert', () => {
  it('get concerts success', async () => {
    const result = await getSameConcerts!({}, { concertId: '1' }, {}, {} as GraphQLResolveInfo);

    expect(ConcertModel.findById).toHaveBeenCalledWith({ _id: '1' });

    expect(ConcertModel.find).toHaveBeenCalledWith({
      $or: [{ concertDay: '2025-02-20T10:52:36.706Z' }, { artistName: ['Drake'] }, { concertTime: '00:00' }],
    });

    expect(result).toEqual([
      {
        _id: '1',
        concertName: "Drake's concert",
        concertPlan: 'amazing show',
        artistName: ['Drake'],
        concertDay: '2025-02-20T10:52:36.706Z',
        concertTime: '00:00',
        concertPhoto: 'https://res.cloudinary.com/do5xczpqa/image/upload/v1740048765/czzfvcjmud0wohtultux.jpg',
        vipTicket: {
          price: 534,
          quantity: 7650,
        },
        regularTicket: {
          price: 567,
          quantity: 54367,
        },
        standingAreaTicket: {
          price: 354,
          quantity: 54,
        },
      },
    ]);
  });

  it('get concerts null', async () => {
    await expect(getSameConcerts!({}, { concertId: 'wrong' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Холбоотой эвент болон тоглолтууд байхгүй байна.');
  });
});

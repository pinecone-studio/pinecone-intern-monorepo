import { GraphQLResolveInfo } from 'graphql';
import { getHotels } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries/hotel';

jest.mock('../../../../src/models', () => ({
  HotelModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getHotels', () => {
  it('should get hotels', async () => {
    const response = await getHotels!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([]);
  });
});

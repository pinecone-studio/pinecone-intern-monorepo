import { GraphQLResolveInfo } from 'graphql';
import { getBookings } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  BookingModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getBookings', () => {
  it('should get bookings', async () => {
    const response = await getBookings!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([]);
  });
});

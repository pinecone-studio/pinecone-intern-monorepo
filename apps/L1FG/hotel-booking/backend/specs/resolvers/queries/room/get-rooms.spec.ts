import { GraphQLResolveInfo } from 'graphql';
import { getRooms } from 'apps/L1FG/hotel-booking/backend/src/resolvers/queries/room';

jest.mock('../../../../src/models', () => ({
  RoomModel: {
    find: jest.fn().mockResolvedValue([]),
  },
}));

describe('getRooms', () => {
  it('should get rooms', async () => {
    const response = await getRooms!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual([]);
  });
});

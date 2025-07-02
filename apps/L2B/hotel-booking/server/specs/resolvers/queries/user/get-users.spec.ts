import { getUsers } from 'apps/L2B/hotel-booking/server/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        email: 'test@email.com',
      },
    ]),
  },
}));

describe('Get Users', () => {
  it('should return a users', async () => {
    const result = await getUsers!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
        email: 'test@email.com',
      },
    ]);
  });
});

import { getFollowing } from 'apps/L1FG/instagram/backend/src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  FollowerModel: {
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue([
        {
          _id: '1',
        },
      ]),
    }),
  },
}));
describe('Get followers', () => {
  it('Should give followers', async () => {
    if (!getFollowing) {
      throw new Error('Function undefined');
    }
    const followers = await getFollowing({}, { searchingUserId: '8' }, { userId: '3' }, {} as GraphQLResolveInfo);
    expect(followers).toEqual([
      {
        _id: '1',
      },
    ]);
  });
  it('Should throw authorization error', async () => {
    if (!getFollowing) {
      throw new Error('Function undefined');
    }
    await expect(getFollowing({}, { searchingUserId: '8' }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow('Unauthorized');
  });
});

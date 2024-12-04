import { GraphQLResolveInfo } from 'graphql';
import { createFollowers } from '../../../../src/resolvers/mutations';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    deleteOne: jest.fn(),
    find: jest
      .fn()
      .mockResolvedValueOnce({
        _id: '1',
        followerId: '2',
        followeeId: '3',
        createdAt: 'date',
      })
      .mockReturnValueOnce([]),
    create: jest.fn().mockResolvedValueOnce({ name: 'test' }).mockRejectedValueOnce(new Error('There is no followers with this ID')),
  },
}));

describe(' Create followers', () => {
  it('sould create followers', async () => {
    const res = await createFollowers!({}, { followeeId: '1', followerId: '2' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({ message: 'Successfully unfollowed' });
  });

  it('should not create followers', async () => {
    try {
      await createFollowers!({}, { followeeId: '1', followerId: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual({ message: 'Successfully followed' });
    }
  });
});

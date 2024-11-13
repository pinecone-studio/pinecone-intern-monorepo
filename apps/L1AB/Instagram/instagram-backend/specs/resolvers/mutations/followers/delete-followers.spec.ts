import { deleteFollower } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    findOneAndDelete: jest.fn().mockResolvedValueOnce({ name: 'test' }).mockReturnValue(null),
  },
}));

describe('deleteFollowers', () => {
  it('it should delete follower', async () => {
    const res = await deleteFollower!({}, { followeeId: '1', followerId: '2' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual({ name: 'test' });
  });

  it('it should throw an error', async () => {
    try {
      await deleteFollower!({}, { followeeId: '1', followerId: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Follower relationship not found'));
    }
  });
});

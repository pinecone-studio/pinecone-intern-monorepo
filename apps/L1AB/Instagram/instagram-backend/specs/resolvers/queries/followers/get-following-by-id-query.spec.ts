import { getFollowingById } from '../../../../src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    find: jest.fn().mockResolvedValueOnce(['bat']).mockReturnValueOnce([]),
  },
}));

describe('getFollowingById', () => {
  it('it should get all following', async () => {
    const res = await getFollowingById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual(['bat']);
  });

  it('it should throw an error', async () => {
    try {
      await getFollowingById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Following not found'));
    }
  });
});

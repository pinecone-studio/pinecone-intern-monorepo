import { GraphQLResolveInfo } from 'graphql';
import { getFollowersById } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  followersModel: {
    find: jest.fn().mockResolvedValueOnce(['test']).mockReturnValueOnce([]),
  },
}));

describe('getFollowersById', () => {
  it('it should get all followers', async () => {
    const res = await getFollowersById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(res).toEqual(['test']);
  });

  it('it should throw an error', async () => {
    try {
      await getFollowersById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Followers not found'));
    }
  });
});

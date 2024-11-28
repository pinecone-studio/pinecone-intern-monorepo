import { GraphQLResolveInfo } from 'graphql';
import { getUserBySearch } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  userModel: {
    find: jest
      .fn()
      .mockResolvedValueOnce({
        username: 'test',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('getUserBySearch', () => {
  it('should get user by search', async () => {
    const res = await getUserBySearch!({}, { searchInput: 'bat' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({
      username: 'test',
    });
  });
  it('should throw an error', async () => {
    try {
      await getUserBySearch!({}, { searchInput: 'bat' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error(`User with the search term "bat" does not exist.`));
    }
  });

  it('input empty', async () => {
    await getUserBySearch!({}, { searchInput: '' }, {}, {} as GraphQLResolveInfo);
  });
});

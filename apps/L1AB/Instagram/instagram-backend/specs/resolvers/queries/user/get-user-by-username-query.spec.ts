import { GraphQLResolveInfo } from 'graphql';
import { getUserByUsername } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        name: 'test',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('getUserByUsername', () => {
  it('should get user', async () => {
    const res = await getUserByUsername!({}, { username: 'test' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({
      name: 'test',
    });
  });
  it('should throw an error', async () => {
    try {
      await getUserByUsername!({}, { username: 'test' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('There is no user with this username'));
    }
  });
});

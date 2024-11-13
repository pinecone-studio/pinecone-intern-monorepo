import { GraphQLResolveInfo } from 'graphql';
import { getUserById } from '../../../../src/resolvers/queries';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        name: 'test',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('getUserById', () => {
  it('should get user', async () => {
    const res = await getUserById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(res).toEqual({
      name: 'test',
    });
  });
  it('should throw an error', async () => {
    try {
      await getUserById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('There is no user with this ID'));
    }
  });
});

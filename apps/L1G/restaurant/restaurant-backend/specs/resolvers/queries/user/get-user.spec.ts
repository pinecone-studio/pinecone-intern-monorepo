import { GraphQLResolveInfo } from 'graphql';
import { getUser } from 'src/resolvers/queries';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        username: 'Test',
        email: 'test@example.com',
        password: 'test1234',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('get User', () => {
  it('should get a user', async () => {
    const result = await getUser?.({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    });
  });

  it("should throw an error if the author doesn't exist", async () => {
    try {
      await getUser?.({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});

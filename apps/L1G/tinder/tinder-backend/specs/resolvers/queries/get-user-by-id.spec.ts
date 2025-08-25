import { getUser } from 'src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('src/models/user.ts', () => ({
  Usermodel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce({
        id: '1',
        name: 'test user',
        email: 'test@example.com',
      })
      .mockReturnValueOnce(null),
  },
}));

describe('get user by id', () => {
  it('shoul return user by id', async () => {
    const result = await getUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result.id).toBe('1');
    expect(result.name).toBe('test user');
    expect(result.email).toBe('test@example.com');
  });

  it('shoul throw error when user not found', async () => {
    try {
      await getUser!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });
});

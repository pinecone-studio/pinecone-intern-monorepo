import { GraphQLResolveInfo } from 'graphql';
import { createUser } from 'src/resolvers/mutations';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    create: jest.fn().mockReturnValue({
      userId: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    }),
  },
}));

describe('createUser', () => {
  it('should create a new user', async () => {
    const result = await createUser?.({}, { input: { username: 'Test', email: 'test@example.com', password: 'test1234' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      userId: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    });
  });
});

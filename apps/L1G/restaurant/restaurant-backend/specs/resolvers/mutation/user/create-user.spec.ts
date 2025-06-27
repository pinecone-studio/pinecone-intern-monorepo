import { GraphQLResolveInfo } from 'graphql';
import { createUser } from 'src/resolvers/mutations';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    create: jest.fn().mockReturnValue({
      _id: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    }),
  },
}));

describe('createUser', () => {
  it('should create a new user', async () => {
    const result = await createUser?.({}, { username: 'Test', email: 'test@example.com', password: 'test1234' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '1',
      username: 'Test',
      email: 'test@example.com',
      password: 'test1234',
    });
  });
});

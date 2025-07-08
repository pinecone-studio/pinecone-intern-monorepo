import { GraphQLResolveInfo } from 'graphql';
import { createUser } from 'src/resolvers/mutations';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    create: jest.fn().mockReturnValue({
      userId: '1',
      email: 'test@example.com',
      password: 'test1234',
    }),
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({email: 'test@example.com'})
  },
}));

describe('createUser', () => {
  it('should create a new user', async () => {
    const result = await createUser?.({}, { input: { email: 'test@example.com', password: 'test1234', username: 'Test' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      userId: '1',
      email: 'test@example.com',
      password: 'test1234',
    });
  });

  it('should throw an error, if user is already registered', async () => {
    try {
      await createUser?.({}, { input: { email: 'test@example.com', password: 'test1234', username:'Test'} }, { email: 'test@example.com' }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User already exists'));
    }
  });
});

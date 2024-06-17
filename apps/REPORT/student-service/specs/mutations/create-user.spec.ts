import { createUser } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/models/user.models', () => ({
  UserModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        firstName: 'John Doe',
        lastName: 'Baldan',
        email: 'baldan@yahoo.com',
        password: 'baldan123',
        role: 'STUDENT',
      })
      .mockRejectedValueOnce(null),
  },
}));

describe('Create user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return it', async () => {
    const mock = {
      _id: '1',
      firstName: 'John Doe',
      lastName: 'Baldan',
      email: 'baldan@yahoo.com',
      password: 'baldan123',
      role: 'STUDENT',
    };

    const result = await createUser!(
      {},
      {
        input: {
          _id: '1',
          firstName: 'John Doe',
          lastName: 'Baldan',
          email: 'baldan@yahoo.com',
          password: 'baldan123',
          role: 'STUDENT',
        },
      },
      {},
      {} as GraphQLResolveInfo
    );

    expect(result).toEqual(mock);
  });

  it('should throw when there is a Database error', async () => {
    const mock = {
      _id: '1',
      firstName: 'John Doe',
      lastName: 'Baldan',
      email: 'baldan@yahoo.com',
      password: 'baldan123',
      role: 'STUDENT',
    };

    try {
      await createUser({}, { input: mock }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('there was a problem creating a new user'));
    }
  });
});

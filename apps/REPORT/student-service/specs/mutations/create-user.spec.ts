import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/user.models', () => ({
  UserModel: {
    create: jest.fn().mockImplementation(() => [
      {
        _id: '1',
        firstName: 'John Doe',
        lastName: 'Baldan',
        email: 'baldan@yahoo.com',
        password: 'baldan123',
        role: 'STUDENT',
      },
    ]),
  },
}));

describe('Create user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return it', async () => {
    const result = UserModel.create({
      firstName: 'John Doe',
      lastName: 'Baldan',
      email: 'baldan@yahoo.com',
      password: 'baldan123',
      role: 'STUDENT',
    });

    expect(result).toEqual([
      {
        _id: '1',
        firstName: 'John Doe',
        lastName: 'Baldan',
        email: 'baldan@yahoo.com',
        password: 'baldan123',
        role: 'STUDENT',
      },
    ]);
  });

  it('should throw GraphQLError when user fails to be created', async () => {
    UserModel.create.mockReturnValueOnce(new GraphQLError('can not create a new user'));

    try {
      const result = UserModel.create({ id: '23' });
      if (result.length === 0) {
        throw new GraphQLError('can not create a new user');
      }
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error.message).toBe('there was a problem creating a new user');
    }
  });
});

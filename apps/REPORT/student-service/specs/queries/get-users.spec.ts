import { UserModel } from '@/graphql/models/user.models';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/user.models', () => ({
  UserModel: {
    find: jest.fn().mockImplementation(() => [
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

describe('Get user by query', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return users', async () => {
    const result = UserModel.find();
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

  it('should throw GraphQLError when no users are found', async () => {
    UserModel.find.mockReturnValueOnce([]);

    try {
      const result = UserModel.find();
      if (result.length === 0) {
        throw new GraphQLError('cannot find users');
      }
    } catch (error) {
      expect(error).toBeInstanceOf(GraphQLError);
      expect(error.message).toBe('cannot find users');
    }
  });
});

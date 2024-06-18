import { UserModel } from '@/graphql/models/user.models';
import { getUsers } from '@/graphql/resolvers/queries';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/models/user.models', () => ({
  UserModel: {
    find: jest.fn(),
  },
}));

describe('Get user by query', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return users', async () => {
    const mock = [
      {
        _id: '1',
        firstName: 'John Doe',
        lastName: 'Baldan',
        email: 'baldan@yahoo.com',
        password: 'baldan123',
        role: 'STUDENT',
      },
    ];

    (UserModel.find as jest.Mock).mockResolvedValue(mock);
    const result = await getUsers!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mock);
  });

  it('should throw GraphQLError when no users are found', async () => {
    const mockError = 'can not find users';
    (UserModel.find as jest.Mock).mockRejectedValue(new Error(mockError));

    await expect(getUsers()).rejects.toThrow(GraphQLError);
  });
});

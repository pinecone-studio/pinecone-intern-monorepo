import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models';
import { getUsers } from '../../../src/resolvers/queries/get-users';

jest.mock('../../../src/models/user', () => ({
  UserModel: {
    find: jest.fn(),
  },
}));

describe('getUsers Query Resolver', () => {
  it('should return users', async () => {
    const mockUsers = [
      {
        _id: '1',
        userName: 'John Doe',
        email: 'test@example.com',
        profileImage: 'https://example.com/profile.jpg',
        phoneNumber: '22334455',
      },
      {
        _id: '2',
        userName: 'Jane Doe',
        email: 'test2@example.com',
        profileImage: 'https://example2.com/profile.jpg',
        phoneNumber: '22334455',
      },
    ];

    (UserModel.find as jest.Mock).mockResolvedValue(mockUsers);

    if (!getUsers) return;

    const result = await getUsers({}, {}, {}, {} as GraphQLResolveInfo);

    expect(UserModel.find).toHaveBeenCalledWith();

    expect(result).toEqual(mockUsers);
  });
});

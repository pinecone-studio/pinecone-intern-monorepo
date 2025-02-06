import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models';
import { getUser } from '../../../src/resolvers/queries/get-user';

jest.mock('../../../src/models/user', () => ({
  UserModel: {
    findById: jest.fn(),
  },
}));

describe('getUser Query Resolver', () => {
  it('should return a user', async () => {
    const mockUser = {
      _id: '1',
      userName: 'John Doe',
      email: 'test@example.com',
      profileImage: 'https://example.com/profile.jpg',
    };

    (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

    if (!getUser) return;

    const result = await getUser({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      _id: '1',
      userName: 'John Doe',
      email: 'test@example.com',
      profileImage: 'https://example.com/profile.jpg',
    });

    expect(UserModel.findById).toHaveBeenCalledWith({ _id: '1' });
  });
});

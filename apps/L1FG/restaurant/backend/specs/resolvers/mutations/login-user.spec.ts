import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models/user';
import { loginUser } from '../../../src/resolvers/mutations/';

jest.mock('../../../src/models/user', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

describe('loginUser Mutation Resolver', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return the user if the credentials are valid', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const mockInput = { email, password };
    const mockUser = {
      _id: '123',
      userName: 'Test User',
      email,
      profileImage: null,
      createdAt: new Date(),
    };

    // Mock the UserModel.findOne method to resolve the mockUser
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    if (!loginUser) return;

    const result = await loginUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockUser);
  });
});

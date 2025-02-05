import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models/user';
import jwt from 'jsonwebtoken';
import { loginUser } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/user', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('loginUser Mutation Resolver', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should return the user and token if the credentials are valid', async () => {
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
    const mockToken = 'mocked-jwt-token';

    // Mock UserModel.findOne to return the mock user
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    // Mock jwt.sign to return a fixed token
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    if (!loginUser) return;

    const result = await loginUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    // Ensure UserModel.findOne is called with correct input
    expect(UserModel.findOne).toHaveBeenCalledWith(mockInput);

    // Ensure jwt.sign is called correctly
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id }, process.env.JWT_SECRET!);

    // Ensure the function returns expected output
    expect(result).toEqual({
      user: mockUser,
      token: mockToken,
    });
  });

  it('should throw an error if credentials are invalid', async () => {
    const mockInput = { email: 'invalid@example.com', password: 'wrongpassword' };

    // Mock UserModel.findOne to return null (user not found)
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    if (!loginUser) return;
    await expect(loginUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid credentials');

    // Ensure UserModel.findOne was called
    expect(UserModel.findOne).toHaveBeenCalledWith(mockInput);
  });
});

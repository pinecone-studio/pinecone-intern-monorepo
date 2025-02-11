import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { loginUser } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/user', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
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
      password: 'hashedpassword', // Mock hashed password
      profileImage: null,
      createdAt: new Date(),
    };
    const mockToken = 'mocked-jwt-token';

    // Mock UserModel.findOne to return the mock user
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    // Mock bcrypt.compare to return true (valid password)
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    // Mock jwt.sign to return a fixed token
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    if (!loginUser) return;

    const result = await loginUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    // Ensure UserModel.findOne is called with correct input
    expect(UserModel.findOne).toHaveBeenCalledWith({ email });

    // Ensure bcrypt.compare is called
    expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);

    // Ensure the function returns expected output
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if the user does not exist', async () => {
    const mockInput = { email: 'invalid@example.com', password: 'wrongpassword' };

    // Mock UserModel.findOne to return null (user not found)
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    if (!loginUser) return;
    await expect(loginUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid credentials');

    // Ensure UserModel.findOne was called
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
  });

  it('should throw an error if the password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';
    const mockInput = { email, password };
    const mockUser = {
      _id: '123',
      userName: 'Test User',
      email,
      password: 'hashedpassword', // Mock hashed password
      profileImage: null,
      createdAt: new Date(),
    };

    // Mock UserModel.findOne to return the mock user
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    // Mock bcrypt.compare to return false (invalid password)
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    if (!loginUser) return;
    await expect(loginUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid credentials');

    // Ensure UserModel.findOne is called
    expect(UserModel.findOne).toHaveBeenCalledWith({ email });

    // Ensure bcrypt.compare is called
    expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
  });
});

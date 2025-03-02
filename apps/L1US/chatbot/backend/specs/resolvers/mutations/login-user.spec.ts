import { loginUser } from '../../../src/resolvers/mutations';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../../src/models/user-model');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('loginUser', () => {
  const mockUser = {
    _id: '12345',
    email: 'test@example.com',
    password: 'hashedPassword',
  };

  const mockInput = {
    input: {
      email: 'test@example.com',
      password: 'plaintextPassword',
    },
  };
  const mockContext = {
    req: {} as NextRequest,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log in a user successfully', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mockedToken');
    if (!loginUser) throw new Error('loginUser resolver is not defined');

    const result = await loginUser({}, mockInput, mockContext, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockInput.input.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(mockInput.input.password, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: mockUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    expect(result).toEqual({ user: mockUser, sessionToken: 'mockedToken' });
  });

  it('should throw an error if user does not exist', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    if (!loginUser) throw new Error('loginUser resolver is not defined');

    await expect(loginUser({}, mockInput, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow('User does not exist');
  });

  it('should throw an error if password is incorrect', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);
    if (!loginUser) throw new Error('loginUser resolver is not defined');

    await expect(loginUser({}, mockInput, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid password');
  });
  it('should throw an error if JWT_SECRET is not defined', async () => {
    delete process.env.JWT_SECRET; // Ensure it's undefined

    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    if (!loginUser) throw new Error('loginUser resolver is not defined');

    await expect(loginUser({}, mockInput, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow('JWT_SECRET is not defined');

    process.env.JWT_SECRET = 'test_secret'; // Restore the environment variable
  });
});

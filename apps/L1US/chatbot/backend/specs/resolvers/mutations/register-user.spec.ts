import { registerUser } from '../../../src/resolvers/mutations';
import { Context } from '../../../src/types';
import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models/user-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../../src/models/user-model', () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword123'),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

describe('registerUser Mutation', () => {
  const mockInput = {
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser',
  };

  const mockContext: Context = {
    req: {} as NextRequest,
  };
  let originalJwtSecret: string | undefined;
  beforeAll(() => {
    originalJwtSecret = process.env.JWT_SECRET;
  });
  afterAll(() => {
    process.env.JWT_SECRET = originalJwtSecret;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (UserModel.create as jest.Mock).mockResolvedValue({
      _id: 'userId123',
      email: mockInput.email,
      username: mockInput.username,
    });
    if (!registerUser) throw new Error('loginUser resolver is not defined');

    const result = await registerUser({}, { input: mockInput }, mockContext, {} as GraphQLResolveInfo);
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(UserModel.findOne).toHaveBeenCalledWith({ username: mockInput.username });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockInput.password, 10);
    expect(UserModel.create).toHaveBeenCalledWith({
      username: mockInput.username,
      email: mockInput.email,
      password: 'hashedPassword123',
    });
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'userId123' }, originalJwtSecret, { expiresIn: '1d' });

    expect(result).toEqual({
      user: {
        _id: 'userId123',
        email: mockInput.email,
        username: mockInput.username,
      },
      sessionToken: 'token',
    });
  });

  it('should throw an error if email is already in use', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce({ email: mockInput.email });

    if (!registerUser) throw new Error('loginUser resolver is not defined');
    await expect(registerUser({}, { input: mockInput }, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow('User exsists with this email');

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
  });

  it('should throw an error if username is already taken', async () => {
    (UserModel.findOne as jest.Mock)
      .mockResolvedValueOnce(null) // First call: email check
      .mockResolvedValueOnce({ username: mockInput.username }); // Second call: username check

    if (!registerUser) throw new Error('loginUser resolver is not defined');
    await expect(registerUser({}, { input: mockInput }, mockContext, {} as GraphQLResolveInfo)).rejects.toThrow('User name is taken');

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockInput.email });
    expect(UserModel.findOne).toHaveBeenCalledWith({ username: mockInput.username });
  });
  it('should throw an error if JWT_SECRET is not defined', async () => {
    delete process.env.JWT_SECRET;
    if (!registerUser) throw new Error('loginUser resolver is not defined');

    await expect(registerUser({}, { input: mockInput }, mockContext, {} as GraphQLResolveInfo)).
    rejects.toThrow('JWT_SECRET is not defined');
  });
});

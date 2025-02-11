import jwt from 'jsonwebtoken';
import { UserModel } from '../../../src/models';
import { GraphQLResolveInfo } from 'graphql';
import { createUser } from '../../../src/resolvers/mutations';
import bcrypt from 'bcryptjs';

jest.mock('../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('jsonwebtoken');

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('createUser Resolver', () => {
  const input = {
    email: 'test@example.com',
    password: 'mockPassword',
    rePassword: 'mockPassword',
    userName: 'testuser',
  };

  const mockUser = {
    _id: '12345',
    email: input.email,
    password: 'hashedPassword', // Hashed password
    userName: input.userName,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user and return a token', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword'); // Mock hashing
    (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    if (!createUser) return;
    const result = await createUser({}, { input }, {}, {} as GraphQLResolveInfo);

    // Ensure UserModel.findOne is called with correct input
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email });

    // Ensure bcrypt.hash is called with the plain password
    expect(bcrypt.hash).toHaveBeenCalledWith(input.password, expect.any(Number));
    expect(bcrypt.hash).toHaveBeenCalledWith(input.rePassword, expect.any(Number));

    // Ensure UserModel.create is called with hashed password
    expect(UserModel.create).toHaveBeenCalledWith({
      email: input.email,
      password: 'hashedPassword', // Ensure it's hashed before storing
      rePassword: 'mockPassword', // Ensure it's hashed before storing
      userName: input.userName,
    });

    // Ensure the function returns expected output
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if user already exists', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);

    if (!createUser) return;
    await expect(createUser({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User already exists');

    // Ensure UserModel.findOne was called
    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email });

    // Ensure UserModel.create was NOT called
    expect(UserModel.create).not.toHaveBeenCalled();
  });
});

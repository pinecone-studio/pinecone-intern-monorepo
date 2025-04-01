import { GraphQLResolveInfo } from 'graphql';
import { loginUser } from '../../../../src/resolvers/mutations';
import { UserModel } from '../../../../src/models';
import bcrypt from 'bcryptjs';
import { catchError, generateToken } from '../../../../src/utils';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('../../../../src/utils', () => ({
  catchError: jest.fn((error) => error),
  generateToken: jest.fn().mockReturnValue('mockToken'),
}));

describe('loginUser', () => {
  const input = { email: 'test@example.com', password: 'password123' };
  const mockUser = { _id: '123', email: input.email, password: 'hashedPassword' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if the user is not found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
  });

  it('should throw an error if the password is incorrect', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Incorrect password!');
  });

  it('should return the user and token if login is successful', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('mockToken');

    const response = await loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: input.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(input.password, mockUser.password);
    expect(generateToken).toHaveBeenCalledWith(mockUser._id);
    expect(response).toEqual({ user: mockUser, sessionToken: 'mockToken' });
  });

  it('should verify the generated session token is returned', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('mockToken');

    const response = await loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo);

    expect(response.sessionToken).toBe('mockToken');
  });

  it('should call catchError and throw the error if an unexpected error occurs', async () => {
    const error = new Error('Database error');
    (UserModel.findOne as jest.Mock).mockRejectedValue(error);
    (catchError as unknown as jest.Mock).mockImplementation((err) => {
      throw err;
    });

    await expect(loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database error');
    expect(catchError).toHaveBeenCalledWith(error);
  });
});

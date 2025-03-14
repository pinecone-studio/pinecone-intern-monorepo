import { GraphQLResolveInfo } from 'graphql';
import { loginUser } from '../../../../src/resolvers/mutations';
import { User } from '../../../../src/models';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../../src/utils';

jest.mock('../../../../src/models', () => ({
  User: {
    findOne: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('../../../../src/utils', () => ({
  catchError: jest.fn((error) => error),
  generateToken: jest.fn().mockReturnValue('mockToken'),
}));

describe('loginUser', () => {
  const input = { email: 'test@example.com', password: 'password123' };
  const mockUser = { _id: '123', email: input.email, password: 'hashedPassword' };

  it('should throw an error if the user is not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
  });

  it('should throw an error if the password is incorrect', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Incorrect password!');
  });

  it('should return the user and token if login is successful', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const response = await loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo);

    expect(User.findOne).toHaveBeenCalledWith({ email: input.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(input.password, mockUser.password);
    expect(generateToken).toHaveBeenCalledWith(mockUser._id);
    expect(response).toEqual({ user: mockUser, sessionToken: 'mockToken' });
  });

  it('should throw an error if an unexpected error occurs', async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(loginUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database error');
  });
});

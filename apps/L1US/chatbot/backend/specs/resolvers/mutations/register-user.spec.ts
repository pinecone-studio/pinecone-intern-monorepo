import { GraphQLResolveInfo } from 'graphql';
import { User } from '../../../src/models';
import { registerUser } from '../../../src/resolvers/mutations';
import { generateToken } from '../../../src/utils';

jest.mock('../../../src/models', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

jest.mock('../../../src/utils', () => ({
  catchError: jest.fn((error) => error),
  validateRegisterUserInput: jest.fn(),
  generateToken: jest.fn().mockReturnValue('mockToken'),
}));

describe('registerUser', () => {
  const input = { email: 'test@example.com', password: 'password123', username: 'testuser' };

  it('should throw an error if the user already exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ email: input.email });

    await expect(registerUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('User already exists with this email or username');
  });

  it('should create a new user and return user with token', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue({ _id: '123', ...input, password: 'hashedPassword' });

    const response = await registerUser!({}, { input }, {} as any, {} as GraphQLResolveInfo);

    expect(User.create).toHaveBeenCalledWith({
      username: input.username,
      email: input.email,
      password: 'hashedPassword',
    });
    expect(generateToken).toHaveBeenCalledWith('123');
    expect(response).toEqual({
      user: { _id: '123', ...input, password: 'hashedPassword' },
      sessionToken: 'mockToken',
    });
  });

  it('should throw an error if an unexpected error occurs', async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    await expect(registerUser!({}, { input }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Database error');
  });
});

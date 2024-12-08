import { signUp } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { otpModel, userModel } from 'apps/L1AB/hotel-booking/backend/src/models';
import bcrypt from 'bcrypt';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    create: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('signUp Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    const mockInput = {
      email: 'test@gmail.com',
      password: '12345678',
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (userModel.create as jest.Mock).mockResolvedValue({ email: 'test@gmail.com', password: 'hashedPassword' });

    const result = await signUp!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(bcrypt.hash).toHaveBeenCalledWith('12345678', 10);
    expect(userModel.create).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'hashedPassword',
    });
    expect(result).toEqual({
      user: { email: 'test@gmail.com', password: 'hashedPassword' },
      success: true,
      message: 'User test@gmail.com created successfully',
    });
  });

  it('should return error when user creation fails', async () => {
    const mockInput = {
      email: 'test@gmail.com',
      otp: '1234',
      password: '12345678',
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    (userModel.create as jest.Mock).mockRejectedValue(new Error('Failed to create user'));

    await expect(signUp!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo)).rejects.toThrow('Failed to create user');

    expect(userModel.create).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'hashedPassword',
    });
  });
});

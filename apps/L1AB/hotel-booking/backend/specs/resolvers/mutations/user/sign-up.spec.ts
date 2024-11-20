import { signUp } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        email: 'test@gmail.com',
        password: "12345678",
      })
      .mockRejectedValueOnce(new Error('Failed to create user')),
  },
}));

describe('Create user', () => {
  it('should create a user successfully', async () => {
    const mockInput = {
        email: 'test@gmail.com',
        password: "12345678",
    };

    const result = await signUp!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      user: mockInput,
      success: true,
      message: 'User test@gmail.com created successfully',
    });
  });

  it('should return error when user creation fails', async () => {
    const mockInput = {
        email: 'test@gmail.com',
        password: "12345678",
    };

    const result = await signUp!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      success: false,
      message: 'Failed to create user',
    });
  });

  it('should return error for invalid email format', async () => {
    const invalidEmailInput = {
      email: 'invalid-email',
      password: "12345678",
    };

    const result = await signUp!({}, { input: invalidEmailInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      success: false,
      message: 'Invalid email format',
    });
  });
});

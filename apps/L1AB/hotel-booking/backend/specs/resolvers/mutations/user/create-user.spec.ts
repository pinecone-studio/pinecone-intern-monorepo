import { GraphQLResolveInfo } from 'graphql';
import { createUser } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/user/create-user';
import { userModel } from '../../../../src/models';

jest.mock('../../../../src/models', () => ({
  userModel: {
    create: jest
      .fn()
      .mockResolvedValueOnce({
        email: 'test@gmail.com',
        password: "hashedpassword",
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

    const result = await createUser!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      success: true,
      message: 'User test@gmail.com created successfully',
    });
  });

  it('should return error when user creation fails', async () => {
    const mockInput = {
        email: 'test@gmail.com',
        password: "12345678",
    };

    const result = await createUser!({}, { input: mockInput }, {} as any, {} as GraphQLResolveInfo);

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

    const result = await createUser!({}, { input: invalidEmailInput }, {} as any, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      success: false,
      message: 'Invalid email format',
    });
  });
});

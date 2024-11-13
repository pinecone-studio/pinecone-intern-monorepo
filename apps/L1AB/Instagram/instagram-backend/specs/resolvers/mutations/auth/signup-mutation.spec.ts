import { signup } from '../../../../src/resolvers/mutations/auth/signup';
import { userModel } from '../../../../src/models';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('$2b$12$QSSxgLwQf8'),
  hash: jest.fn().mockResolvedValue('$2b$12$QSSxgLwQf8'),
}));

jest.mock('../../../../src/models', () => ({
  userModel: {
    create: jest.fn(),
  },
}));

describe('signup mutation', () => {
  const mockUser = {
    email: 'test@example.com',
    username: 'testuser',
    password: 'password123',
    fullname: 'Test User',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user with valid input', async () => {
    const expectedUser = {
      ...mockUser,
      password: '$2b$12$QSSxgLwQf8',
    };

    (userModel.create as jest.Mock).mockResolvedValueOnce(expectedUser);

    const result = await signup!(
      {},
      {
        email: mockUser.email,
        username: mockUser.username,
        password: mockUser.password,
        fullname: mockUser.fullname,
      },
      {} as any,
      {} as any
    );

    expect(userModel.create).toHaveBeenCalledWith(expectedUser);
    expect(result).toEqual(expectedUser);
  });

  it('should throw an error if userModel.create fails', async () => {
    const errorMessage = 'Failed to create user';
    (userModel.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(
      signup!(
        {},
        {
          email: mockUser.email,
          username: mockUser.username,
          password: mockUser.password,
          fullname: mockUser.fullname,
        },
        {} as any,
        {} as any
      )
    ).rejects.toThrow(errorMessage);
  });

  it('should pass through all provided fields to userModel.create', async () => {
    const expectedUser = {
      ...mockUser,
      password: '$2b$12$QSSxgLwQf8',
    };

    (userModel.create as jest.Mock).mockResolvedValueOnce(expectedUser);

    await signup!({}, mockUser, {} as any, {} as any);

    expect(userModel.create).toHaveBeenCalledWith(expectedUser);
    expect(userModel.create).toHaveBeenCalledTimes(1);
  });
});

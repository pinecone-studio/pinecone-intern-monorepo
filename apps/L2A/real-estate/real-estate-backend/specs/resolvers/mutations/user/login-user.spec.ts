// specs/resolvers/mutations/login-user.spec.ts

const mockedUserModel = {
  findOne: jest.fn(),
};

jest.mock('../../../../src/models/user', () => ({
  USER_MODEL: mockedUserModel,
}));


import { loginUser } from '../../../../src/resolvers/mutations/user/login-user';

type LoginResponse = {
  token: string;
};

describe('loginUser resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return token when user is found', async () => {
    mockedUserModel.findOne.mockResolvedValueOnce({ _id: '123456' });

    const result = await loginUser({}, { email: 'test@example.com', password: '123456' }) as LoginResponse;

    expect(typeof result.token).toBe('string');
    expect(result.token).toBeDefined();
  });

  it('should throw error when user not found', async () => {
    mockedUserModel.findOne.mockResolvedValueOnce(null);

    await expect(
      loginUser({}, { email: 'notfound@example.com', password: '123456' })
    ).rejects.toThrow('user not found');
  });
});

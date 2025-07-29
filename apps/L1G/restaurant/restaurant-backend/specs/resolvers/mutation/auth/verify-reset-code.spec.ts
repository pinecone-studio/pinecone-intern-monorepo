import { verifyResetCode } from 'src/resolvers/mutations/auth/verify-reset-code';
import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from 'src/models/user.model';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

const mockContext = {};
const mockInfo = {} as GraphQLResolveInfo;

const mockUser = {
  userId: '1',
  username: 'Test',
  email: 'test@example.com',
  password: 'hashedPassword',
  resetCode: 'test1234',
  resetCodeExpiresAt: new Date(Date.now() + 3600000),
  save: jest.fn().mockResolvedValue({
    input: true,
    output: true,
  }),
};

describe('verifyResetCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (UserModel.findOne as jest.Mock).mockResolvedValue({ ...mockUser });
  });

  it('should successfully verify a valid reset code', async () => {
    const result = await verifyResetCode?.({}, { input: { email: 'test@example.com', code: 'test1234' } }, mockContext, mockInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(result).toEqual({ input: true, output: true });
  });

  it('should throw an error if the user does not exist', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(verifyResetCode?.({}, { input: { email: 'nonexistent@example.com', code: 'test1234' } }, mockContext, mockInfo)).rejects.toThrow('Invalid code');
  });

  it('should throw an error if the reset code is invalid', async () => {
    await expect(verifyResetCode?.({}, { input: { email: 'test@example.com', code: 'wrongCode' } }, mockContext, mockInfo)).rejects.toThrow('Invalid code');
  });

  it('should throw an error if the reset code has expired', async () => {
    const expiredUser = {
      ...mockUser,
      resetCodeExpiresAt: new Date(Date.now() - 1000), // 1 second in the past
    };
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(expiredUser);

    await expect(verifyResetCode?.({}, { input: { email: 'test@example.com', code: 'test1234' } }, mockContext, mockInfo)).rejects.toThrow('Code expired');
  });

  it('should throw an error if resetCodeExpiresAt is not set', async () => {
    const userWithoutExpiry = {
      ...mockUser,
      resetCodeExpiresAt: undefined,
    };
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(userWithoutExpiry);

    await expect(verifyResetCode?.({}, { input: { email: 'test@example.com', code: 'test1234' } }, mockContext, mockInfo)).rejects.toThrow('Code expired');
  });
});

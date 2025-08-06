import { resetPassword } from 'src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from 'src/models/user.model';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

const mockUser = {
  userId: '1',
  username: 'Test',
  email: 'test@example.com',
  password: 'hashedPassword',
  resetCode: null,
  resetCodeExpiresAt: null,
  save: jest.fn().mockResolvedValue(true),
};

describe('resetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
  });

  it("should reset a user's password", async () => {
    const result = await resetPassword?.({}, { input: { email: 'test@example.com', newPassword: 'test1234' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      success: true,
      message: 'Password reset successfully',
    });
  });

  it('should throw an error if the user doesnt exist', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(resetPassword?.({}, { input: { email: 'nonexistent@example.com', newPassword: 'test1234' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
  });
});

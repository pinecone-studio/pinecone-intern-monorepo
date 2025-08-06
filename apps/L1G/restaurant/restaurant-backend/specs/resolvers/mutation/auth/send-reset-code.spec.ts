import { sendResetCode } from 'src/resolvers/mutations/auth/send-reset-code';
import { UserModel } from 'src/models/user.model';
import { GraphQLResolveInfo } from 'graphql';
import { sendResetEmail } from 'src/utils/send-email';

jest.mock('src/models/user.model', () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('src/utils/send-email', () => ({
  sendResetEmail: jest.fn().mockResolvedValue(true),
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

describe('sendResetCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
  });

  it('should send reset code', async () => {
    const result = await sendResetCode?.({}, { input: { email: 'test@example.com' } }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(mockUser.save).toHaveBeenCalled();
    expect(sendResetEmail).toHaveBeenCalledWith('test@example.com', expect.any(String));
    expect(result).toEqual({ success: true, message: 'Reset code sent successfully' });
  });

  it('should throw an error if the user doesnt exist', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(sendResetCode?.({}, { input: { email: 'nonexistent@example.com' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
  });
});

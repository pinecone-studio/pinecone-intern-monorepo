import bcrypt from 'bcryptjs';
import { GraphQLResolveInfo } from 'graphql';
import { userModel } from '../../../src/models';
import changeCurrentPassword from '../../../src/resolvers/mutations/change-password';

jest.mock('bcryptjs');
jest.mock('../../../src/models', () => ({
  userModel: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('changeCurrentPassword', () => {
  const mockUser = {
    id: 'user-id',
    email: 'test@example.com',
    password: 'hashed-old-password',
  };

  const args = {
    currentPassword: 'oldPassword',
    newPassword: 'newPassword',
    email: 'test@example.com',
  };

  const context = {};
  const info = {} as GraphQLResolveInfo;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if user not found', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(changeCurrentPassword({}, args, context, info)).rejects.toThrow('Хэрэглэгч олдсонгүй.');
  });

  it('should throw error if current password is incorrect', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(changeCurrentPassword({}, args, context, info)).rejects.toThrow('Хуучин нууц үг буруу байна.');
  });

  it('should throw error if new password is same as current', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const sameArgs = { ...args, newPassword: 'oldPassword' };

    await expect(changeCurrentPassword({}, sameArgs, context, info)).rejects.toThrow('Шинэ нууц үг хуучинтой ижил байна.');
  });

  it('should update password and return updated user', async () => {
    (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-new-password');

    const updatedUser = { ...mockUser, password: 'hashed-new-password' };
    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

    const result = await changeCurrentPassword({}, args, context, info);

    expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('user-id', { password: 'hashed-new-password' });
    expect(result).toEqual(updatedUser);
  });
});

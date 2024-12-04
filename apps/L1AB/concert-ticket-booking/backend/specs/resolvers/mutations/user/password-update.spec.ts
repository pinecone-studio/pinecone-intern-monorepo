import { passwordUpdate } from '../../../../src/resolvers/mutations';
import { userModel } from 'apps/L1AB/concert-ticket-booking/backend/src/models';
import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcrypt';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('update password', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update password successfully', async () => {
    (userModel.findById as jest.Mock).mockResolvedValue({ userId: '123', password: 'hashedOldPassword' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword');
    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({ modifiedCount: 1 });

    const result = await passwordUpdate!({}, { input: { oldPassword: 'oldpassword', newPassword: 'newpassword' } }, { user: { userId: '123' } }, {} as GraphQLResolveInfo);

    expect(userModel.findById).toHaveBeenCalledWith('123');
    expect(bcrypt.compare).toHaveBeenCalledWith('oldpassword', 'hashedOldPassword');
    expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { password: 'hashedNewPassword' });
    expect(result).toEqual({
      success: true,
      message: 'Нууц үг амжилттай шинэчлэгдлээ.',
    });
  });

  it('should return error when old password does not match', async () => {
    (userModel.findById as jest.Mock).mockResolvedValue({ userId: '123', password: 'hashedOldPassword' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      passwordUpdate!({}, { input: { oldPassword: 'wrongOldPassword', newPassword: 'newpassword' } }, { user: { userId: '123' } }, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Хуучин нууц үг таарахгүй байна.');

    expect(userModel.findById).toHaveBeenCalledWith('123');
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongOldPassword', 'hashedOldPassword');
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should return error when user is not found', async () => {
    (userModel.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      passwordUpdate!({}, { input: { oldPassword: 'oldpassword', newPassword: 'newpassword' } }, { user: { userId: '123' } }, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Хэрэглэгч олдсонгүй');

    expect(userModel.findById).toHaveBeenCalledWith('123');
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('should return error when user is not logged in', async () => {
    await expect(
      passwordUpdate!({}, { input: { oldPassword: 'oldpassword', newPassword: 'newpassword' } }, { user: null }, {} as GraphQLResolveInfo)
    ).rejects.toThrow('Та нэвтэрнэ үү!');

    expect(userModel.findById).not.toHaveBeenCalled();
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });
});

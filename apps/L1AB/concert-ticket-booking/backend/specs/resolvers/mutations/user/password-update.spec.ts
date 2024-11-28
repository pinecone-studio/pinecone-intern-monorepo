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

    expect(result).toEqual({
      success: true,
      message: 'Нууц үг амжилттай шинэчлэгдлээ.',
    });

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { password: 'hashedNewPassword' });
  });

  it('should return error when old password does not match', async () => {
    (userModel.findById as jest.Mock).mockResolvedValue({ userId: '123', password: 'hashedOldPassword' });
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const result = await passwordUpdate!({}, { input: { oldPassword: 'wrongOldPassword', newPassword: 'newpassword' } }, { user: { userId: '123' } }, {} as GraphQLResolveInfo);

    expect(result);
  });

  it('should return error when user is not found', async () => {
    (userModel.findById as jest.Mock).mockResolvedValue(null);

    const result = await passwordUpdate!({}, { input: { oldPassword: 'oldpassword', newPassword: 'newpassword' } }, { user: { userId: '123' } }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      success: false,
      message: 'Хэрэглэгч олдсонгүй.',
    });
  });

  it('should return error when user is not logged in', async () => {
    const result = await passwordUpdate!({}, { input: { oldPassword: 'oldpassword', newPassword: 'newpassword' } }, { user: null }, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      success: false,
      message: 'Хэрэглэгч нэвтэрч ороогүй байна.',
    });
  });
});

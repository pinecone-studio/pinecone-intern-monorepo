import { GraphQLResolveInfo } from 'graphql';
import { userModel } from '../../../src/models';
import { updateUserInfo } from '../../../src/resolvers/mutations';
import { checkPassword } from '../../../src/utils/check-password';
import { findUserById } from '../../../src/utils/find-user-by-id';

jest.mock('../../../src/models');
jest.mock('../../../src/utils/check-password');
jest.mock('../../../src/utils/find-user-by-id');

describe('updateUserInfo', () => {
  const mockUserId = 'user-id-123';
  const mockPassword = 'correct-password';
  const mockUser = {
    _id: mockUserId,
    email: 'old@example.com',
    phone: '99119911',
    password: 'hashed-password',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if password is not provided', async () => {
    if (updateUserInfo) {
      await expect(updateUserInfo({}, { id: mockUserId, email: 'new@example.com', password: '', phone: 99110000 }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Нууц үг оруулна уу!');
    }
  });

  it('should update user info if password is correct', async () => {
    (findUserById as jest.Mock).mockResolvedValue(mockUser);
    (checkPassword as jest.Mock).mockResolvedValue(true);
    const updatedUser = {
      _id: mockUserId,
      email: 'new@example.com',
      phone: '99110000',
    };
    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);
    if (updateUserInfo) {
      const result = await updateUserInfo({}, { id: mockUserId, email: 'new@example.com', password: mockPassword, phone: 99110000 }, {}, {} as GraphQLResolveInfo);

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, { email: 'new@example.com', phone: 99110000 }, { new: true });
      expect(result).toEqual(updatedUser);
    }
  });

  it('should catch errors and throw them', async () => {
    (findUserById as jest.Mock).mockRejectedValue(new Error('DB error'));
    if (updateUserInfo) {
      await expect(updateUserInfo({}, { id: mockUserId, email: 'fail@example.com', password: mockPassword, phone: 99118888 }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('DB error');
    }
  });
});

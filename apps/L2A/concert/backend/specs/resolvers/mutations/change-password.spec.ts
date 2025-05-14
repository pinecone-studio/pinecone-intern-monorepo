import { GraphQLResolveInfo } from 'graphql';
import { userModel } from '../../../src/models';
import { changeCurrentPassword } from '../../../src/resolvers/mutations';

const mockUser = {
  id: 'user-id',
  email: 'test@example.com',
  password: 'hashed-old-password',
};

jest.mock('../../../src/models');
jest.mock('../../../src/utils/find-user-by-email', () => ({
  findUserByEmail: jest.fn().mockResolvedValue({
    id: 'user-id',
    email: 'test@example.com',
    password: 'hashed-old-password',
  }),
}));
jest.mock('../../../src/utils/check-password', () => ({
  checkPassword: jest.fn().mockResolvedValue(true),
}));
jest.mock('../../../src/utils/hash-password', () => ({
  hashPassword: jest.fn().mockResolvedValue('mock-password'),
}));

describe('changeCurrentPassword', () => {
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

  it('should update password and return updated user', async () => {
    const updatedUser = { ...mockUser, password: 'mock-password' };
    (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

    const result = await changeCurrentPassword({}, args, context, info);

    expect(result).toEqual(updatedUser);
  });

  it('should throw an error', async () => {
    (userModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Серверийн алдаа'));

    await expect(changeCurrentPassword({}, args, context, info)).rejects.toThrow(new Error('Серверийн алдаа'));
  });
});

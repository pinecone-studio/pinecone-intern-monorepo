import { GraphQLResolveInfo } from 'graphql';
import { userModel } from '../../../src/models';
import { hashPassword } from '../../../src/utils/auth';
import { updatePassword } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models');
jest.mock('../../../src/utils/auth');

describe('updatePassword resolver', () => {
  const mockUser = {
    _id: 'user123',
    password: 'oldHashedPassword',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update password successfully', async () => {
    (hashPassword as jest.Mock).mockResolvedValue('newHashedPassword');
    userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

    const result = await updatePassword!({}, { _id: 'user123', password: 'newPassword' }, {}, {} as GraphQLResolveInfo);

    expect(hashPassword).toHaveBeenCalledWith('newPassword');

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('user123', { $set: { password: 'newHashedPassword' } }, { new: true });
    expect(result).toEqual(mockUser);
  });

  it('should throw error if user not found', async () => {
    (hashPassword as jest.Mock).mockResolvedValue('hashed');

    userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await expect(updatePassword!({}, { _id: 'user123', password: 'pass' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
  });
});

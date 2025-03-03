import { UserModel } from '../../../../src/models';
import { updatePassword } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcryptjs';

jest.mock('apps/L1FG/concert-ticket/backend/src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ email: 'zaya', password: 'oldHashedPassword', _id: '1' }),
    findOneAndUpdate: jest.fn().mockResolvedValue({ email: 'zaya', password: 'newHashedPassword', _id: '1' }),
  },
}));

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockReturnValue('newHashedPassword'),
}));

describe('updatePassword', () => {
  it('email not found', async () => {
    await expect(updatePassword!({}, { input: { email: 'zaya', newPassword: '2222' } }, { userId: null }, {} as GraphQLResolveInfo)).rejects.toThrow(new Error('Хэрэглэгчийн имэйл олдсонгүй.'));
  });

  it('updates the password when the user exists', async () => {
    const result = await updatePassword!({}, { input: { email: 'zaya', newPassword: '2222' } }, { userId: null }, {} as GraphQLResolveInfo);

    expect(bcrypt.hashSync).toHaveBeenCalledWith('2222', 10);

    expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith({ email: 'zaya' }, { password: 'newHashedPassword' });

    expect(result).toEqual({ _id: '1', email: 'zaya', password: 'newHashedPassword' });
  });
});

import { UserModel } from 'apps/L1FG/concert-ticket/backend/src/models';
import { newPassword } from 'apps/L1FG/concert-ticket/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('bcryptjs', () => ({
  compareSync: jest.fn((oldpassword, newPassword) => oldpassword === newPassword),
  hashSync: jest.fn().mockResolvedValueOnce('2222'),
}));

jest.mock('apps/L1FG/concert-ticket/backend/src/models/user.model.ts', () => ({
  UserModel: {
    findById: jest.fn().mockImplementation(async ({ _id }) => {
      if (_id === '679b0d4f375c5172da567f67') {
        return { _id: '679b0d4f375c5172da567f67', password: '1111', email: 'test@gmail.com' };
      }
      return null;
    }),
    findByIdAndUpdate: jest.fn().mockImplementation(async ({ _id }) => ({
      _id: '679b0d4f375c5172da567f67',
      password: '2222',
      email: 'test@gmail.com',
    })),
  },
}));
describe('new password', () => {
  it('1.update order successfull', async () => {
    const result = await newPassword!({}, { input: { oldPassword: '1111', newPassword: '2222', userId: '679b0d4f375c5172da567f67' } }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({ _id: '679b0d4f375c5172da567f67', email: 'test@gmail.com', password: '2222' });
    expect(UserModel.findById).toHaveBeenCalledWith({ _id: '679b0d4f375c5172da567f67' });
  });
  it('2.user not found', async () => {
    await expect(newPassword!({}, { input: { oldPassword: '1111', newPassword: '2222', userId: '679b0d4f375c5172da567f60' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      new Error('User not found')
    );
  });
  it('3.no matched', async () => {
    await expect(newPassword!({}, { input: { oldPassword: '1212', newPassword: '2222', userId: '679b0d4f375c5172da567f67' } }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(
      new Error('Хуучин нууц үг буруу байна')
    );
  });
});

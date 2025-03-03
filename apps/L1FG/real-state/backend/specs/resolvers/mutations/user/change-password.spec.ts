import { Response } from '../../../../src/generated';
import { changePassword } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce({ _id: 1, otp: '1111' }).mockResolvedValueOnce(null).mockResolvedValueOnce({ _id: '1', otp: '1111' }),
    updateOne: jest.fn().mockResolvedValueOnce({}),
  },
}));

describe('Change password', () => {
  it('1. change password', async () => {
    const response = await changePassword!({}, { input: { email: '', password: '', otp: '1111' } }, { userId: null }, {} as GraphQLResolveInfo);
    expect(response).toEqual(Response.Success);
  });

  it('2. user not found', async () => {
    try {
      await changePassword!({}, { input: { email: '', password: '', otp: '1111' } }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      console.log('error', error);
      expect(error).toEqual(new Error('User not Found'));
    }
  });

  it('3. throw invalid otp error', async () => {
    try {
      await changePassword!({}, { input: { email: '', password: '', otp: '' } }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid OTP'));
    }
  });
});

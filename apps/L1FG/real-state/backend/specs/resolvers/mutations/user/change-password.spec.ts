import { Response } from 'apps/L1FG/real-state/backend/src/generated';
import { changePassword } from 'apps/L1FG/real-state/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce({ _id: 1, otp: '1111' }).mockResolvedValueOnce(null).mockResolvedValueOnce({ _id: '1', otp: '1111' }),
    updateOne: jest.fn().mockResolvedValueOnce({}),
  },
}));

describe('Change password', () => {
  it('1. change password', async () => {
    const response = await changePassword!({}, { input: { email: '', password: '', otp: '1111' } }, {}, {} as GraphQLResolveInfo);
    expect(response).toEqual(Response.Success);
  });

  it('2. user not found', async () => {
    try {
      await changePassword!({}, { input: { email: '', password: '', otp: '1111' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      console.log('error', error);
      expect(error).toEqual(new Error('User not Found'));
    }
  });

  it('3. throw invalid otp error', async () => {
    try {
      await changePassword!({}, { input: { email: '', password: '', otp: '' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid OTP'));
    }
  });
});

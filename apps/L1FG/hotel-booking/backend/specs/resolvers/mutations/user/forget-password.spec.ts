import { forgetPassword } from '../../../../src/resolvers/mutations/user/forget-password';
import { GraphQLResolveInfo } from 'graphql';

const input = { email: 'test@gmail.com', password: 'test' };

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ email: 'mgd' }),
    findByIdAndUpdate: jest.fn().mockResolvedValue(null),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

describe('forgetPassword', () => {
  it('should forgetPassword', async () => {
    try {
      await forgetPassword!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User not found or OTP not verified'));
    }
  });
  it('should not forgetPassword', async () => {
    try {
      await forgetPassword!({}, { input }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User already exists'));
    }
  });
});

import { signIn } from 'apps/L1AB/hotel-booking/backend/src/resolvers/mutations/user/sign-in';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockResolvedValueOnce(null),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

describe('login', () => {
  it('should login', async () => {
    const response = await signIn!({}, { input: { email: '', password: '' } }, {} as any, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: '1',
      },
      token: 'token',
    });
  });

  it('should not signIn', async () => {
    try {
      await signIn!({}, { input: { email: '', password: '' } }, {} as any, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid credentials'));
    }
  });
});

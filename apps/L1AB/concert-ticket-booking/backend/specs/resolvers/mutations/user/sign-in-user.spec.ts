import { signInUser } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn().mockResolvedValueOnce({ _id: '1' }).mockResolvedValueOnce({ _id: '1' }).mockResolvedValueOnce(null),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false),
}));

describe('Sign In User', () => {
  it('should sign in user', async () => {
    const response = await signInUser!({}, { input: { email: '', password: '' } }, { userId: null }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: '1',
      },
      token: 'token',
    });
  });

  it('should not sign in user due to wrong username or password', async () => {
    try {
      await signInUser!({}, { input: { email: '', password: '' } }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Username or Password incorrect'));
    }
  });

  it('should not sign in user', async () => {
    try {
      await signInUser!({}, { input: { email: '', password: '' } }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid credentials'));
    }
  });
});

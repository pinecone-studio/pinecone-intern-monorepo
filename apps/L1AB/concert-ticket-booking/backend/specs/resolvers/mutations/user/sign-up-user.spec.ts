import { signUpUser } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const input = { email: 'test@gmail.com', name: 'test', phone: 'test', password: 'test' };

jest.mock('../../../../src/models', () => ({
  userModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ _id: '1' }),
    create: jest.fn().mockResolvedValue({ _id: '1' }),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

describe('should sign up new user', () => {
  it('should sign-up new user', async () => {
    const response = await signUpUser!({}, { input }, { userId: null }, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: '1',
      },
      token: 'token',
    });
  });

  it('should not sign up new user', async () => {
    try {
      await signUpUser!({}, { input }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Unable to process request'));
    }
  });
});

import { login } from '../../../../src/resolvers/mutations/user/login';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models/user.model.ts', () => ({
  UserModel: {
    findOne: jest
      .fn()
      .mockResolvedValueOnce({
        user: {
          _id: '1',
        },
      })
      .mockResolvedValueOnce({
        user: {
          _id: '1',
        },
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('login', () => {
  it('1.email should login', async () => {
    const response = await login!({}, { input: { email: 'aa', password: 'aa' } }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: '1',
      },
    });
  });
  it('2.phone  should login', async () => {
    const response = await login!({}, { input: { phone: '99', password: 'aa' } }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: '1',
      },
    });
  });
  it('3. should not login', async () => {
    try {
      await login!({}, { input: { email: '', password: '' } }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Invalid credentials'));
    }
  });
});

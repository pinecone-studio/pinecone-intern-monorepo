import { register } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models/user.model.ts', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValue({ _id: '1' }),
    create: jest.fn().mockResolvedValue({ _id: '1' }),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

const input = { name: 'test', email: 'test@gmail.com', phone: 'test', password: 'test' };

describe('register', () => {
  it('1. should register', async () => {
    const response = await register!({}, { input }, { userId: null }, {} as GraphQLResolveInfo);
    expect(response).toEqual({
      user: {
        _id: '1',
      },
      token: 'token',
    });
  });
  it('2. should no register', async () => {
    try {
      await register!({}, { input }, { userId: null }, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Имэйл бүртгэлтэй байна !'));
    }
  });
});

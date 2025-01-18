import { login } from 'apps/L1FG/instagram/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValue({
      _id: '1',
      userName: 'jordan',
      fullName: 'jordan mike',
      email: 'jordan@gmail.com',
      bio: '',
      password: 'jordan1234',
      isPrivate: false,
      hasStory: false,
      profileImage: 'http://image',
      gender: 'not_know',
    }),
  },
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => {
    return 'token';
  }),
}));
jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValueOnce(false).mockResolvedValue(true),
}));
jest.mock('../../../../src/utils/token-expire-cal', () => ({
  tokenExpireCal: jest.fn(() => {
    return 1;
  }),
}));
describe('Login', () => {
  const input = {
    email: 'jordan@gmail.com',
    password: 'jordan1234',
  };
  it('Should throw error when user not found', async () => {
    if (!login) {
      return;
    }
    await expect(login({}, { input: input }, { userId: '12' }, {} as GraphQLResolveInfo)).rejects.toThrow('Бүртгэлгүй байна');
  });
  it('Should email or password incorrect', async () => {
    if (!login) {
      return;
    }
    await expect(login({}, { input: input }, { userId: '12' }, {} as GraphQLResolveInfo)).rejects.toThrow('Password is incorrect');
  });
  it('Should user login', async () => {
    process.env.SESSION_SECRET = '123';
    if (!login) {
      return;
    }
    await expect(login({}, { input: input }, { userId: '12' }, {} as GraphQLResolveInfo)).resolves.toEqual({
      token: 'token',
      exp: 1,
      user: {
        _id: '1',
        userName: 'jordan',
        fullName: 'jordan mike',
        email: 'jordan@gmail.com',
        bio: '',
        password: 'jordan1234',
        isPrivate: false,
        hasStory: false,
        profileImage: 'http://image',
        gender: 'not_know',
      },
    });
  });
  it('Sould throw session secret undefined', async () => {
    process.env.SESSION_SECRET = '';
    if (!login) {
      return;
    }
    await expect(login({}, { input: input }, { userId: '12' }, {} as GraphQLResolveInfo)).rejects.toThrow('Session secret is not defined');
  });
});

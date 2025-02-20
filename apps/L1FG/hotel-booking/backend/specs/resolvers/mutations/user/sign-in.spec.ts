import { signIn } from 'apps/L1FG/hotel-booking/backend/src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcryptjs';

jest.mock('../../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValue({
      _id: 'userId123',
      email: 'test@example.com',
      password: 'sdiufher9ou49inkjdsvnienkfv',
    }),
  },
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => {
    return 'mocked-jwt-token';
  }),
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true),
}));

describe('signIn mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const input = {
    _id: 'userId123',
    email: 'test@example.com',
    password: 'sdiufher9ou49inkjdsvnienkfv',
  };

  it('should throw an error if user is not found', async () => {
    process.env.JWT_SECRET = 'mocked-secret';
    try {
      await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('User Not Found'));
    }
  });

  it('should throw an error if the password is incorrect', async () => {
    process.env.JWT_SECRET = 'mocked-secret';
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    try {
      await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new Error('Password is wrong'));
    }
  });

  it('should throw an error if session secret is not set', async () => {
    delete process.env.JWT_SECRET;
    await expect(signIn!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Secret is not here bro');
  });

  it('should return user and token when sign-in is successful', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    process.env.JWT_SECRET = 'mocked-secret';

    const response = await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(response).toEqual({
      user: {
        _id: 'userId123',
        email: 'test@example.com',
        password: 'sdiufher9ou49inkjdsvnienkfv',
      },
      token: 'mocked-jwt-token',
    });
  });
});

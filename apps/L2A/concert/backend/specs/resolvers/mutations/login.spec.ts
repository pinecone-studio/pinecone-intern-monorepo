import { GraphQLResolveInfo } from 'graphql';
import { loginUser } from '../../../src/resolvers/mutations/login';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../../../src/utils/find-user-by-email';

jest.mock('../../../src/utils/find-user-by-email', () => ({
  findUserByEmail: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

const context = {};

describe('login', () => {
  it('should login successfully', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue({ _id: '1', password: 'hashedPassword', email: 'test@gmail.com' });

    if (loginUser) {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await loginUser({}, { email: 'test@email.com', password: 'testing11' }, context, {} as GraphQLResolveInfo);

      expect(result.email).toBe('test@gmail.com');
      expect(result.password).toBe('hashedPassword');
      expect(result.JWT).toBe('token');
    }
  });

  it('test jwt token', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue({ id: '1', password: 'hashedPassword', email: 'test@gmail.com' });

    if (loginUser) {
      const result = await loginUser({}, { email: 'test@email.com', password: 'testing11' }, context, {} as GraphQLResolveInfo);

      expect(result.id).toBe('1');
      expect(result.JWT).toBe('token');
    }
  });

  it('should throw an error for invalid password', async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue({ id: '1', password: 'hashedPassword', email: 'test@gmail.com' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    if (loginUser) {
      await expect(loginUser({}, { email: 'test@gmail.com', password: 'testpass' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('Нууц үг буруу байна!');
    }
  });

  it('should throw if user is not found', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (findUserByEmail as jest.Mock).mockRejectedValue(new Error('Хэрэглэгч олдсонгүй'));

    if (loginUser) {
      await expect(loginUser({}, { email: 'tes@gmail.com', password: 'x123123123' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('Хэрэглэгч олдсонгүй');
    }
  });
});

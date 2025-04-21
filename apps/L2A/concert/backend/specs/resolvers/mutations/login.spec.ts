import { GraphQLResolveInfo } from 'graphql';
import bcrypt from 'bcrypt';
import { loginUser } from '../../../src/resolvers/mutations/login';
jest.mock('../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValue({ _id: '1', password: 'hashedPassword', email: 'test@gmail.com' }),
  },
}));
jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token'),
}));
const context = {};
describe('login', () => {
  it('should login successfully', async () => {
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    if (loginUser) {
      const result = await loginUser({}, { email: 'test@email.com', password: 'testing11' }, context, {} as GraphQLResolveInfo);
      expect(result.email).toBe('test@gmail.com');
      expect(result.password).toBe('hashedPassword');
      expect(result.JWT).toBe('token');
    }
  });

  it('should throw an error for invalid password', async () => {
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    jest.mock('bcrypt', () => ({
      compare: jest.fn().mockResolvedValue(false),
    }));
    if (loginUser) {
      await expect(loginUser({}, { email: 'test@gmail.com', password: 'testpass' }, context, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid email or password');
    }
  });
});

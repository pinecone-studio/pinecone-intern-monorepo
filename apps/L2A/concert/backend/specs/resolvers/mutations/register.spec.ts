import { GraphQLResolveInfo } from 'graphql';
import { registerUser } from '../../../src/resolvers/mutations/register';

jest.mock('../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      email: 'test@gmail.com',
      password: 'hashedPassword',
    }),
  },
}));
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));
type response = {
  email?: string;
  password?: string;
};
const context = {};
const info = {} as GraphQLResolveInfo;
const args = {
  email: 'test@gmail.com',
  password: 'testingpass',
};
describe('check user register', () => {
  it('mutation - registerUser', async () => {
    if (registerUser) {
      const response: response = await registerUser({}, args, context, info);
      expect(response).toBeDefined();
      expect(response.email).toBe('test@gmail.com');
      expect(response.password).toBe('hashedPassword');
    }
  });
  it('should throw error when provided with a short password', async () => {
    if (registerUser) {
      await expect(registerUser({}, { email: 'trsing@gmail.com', password: 'testin' }, context, info)).rejects.toThrow('Мэдээллээ гүйцээнэ үү. Эсвэл Пассвордоо шалгана уу.');
    }
  });
});

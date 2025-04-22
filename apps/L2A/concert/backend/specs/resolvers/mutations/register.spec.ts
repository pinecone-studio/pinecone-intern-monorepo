import { GraphQLResolveInfo } from 'graphql';
import { addUser } from '../../../src/resolvers/mutations/register';
import bcrypt from 'bcrypt';
import { UserModel } from '../../../src/models';

jest.mock('../../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({
      email: 'test@gmail.com',
      password: 'hashedPassword',
    }),
  },
}));

jest.mock('bcrypt');

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
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    if (addUser) {
      const response: response = await addUser({}, args, context, info);
      expect(response).toBeDefined();
      expect(response.email).toBe('test@gmail.com');
      expect(response.password).toBe('hashedPassword');
    }
  });
  it('should throw an error when a short pass provided', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    if (addUser) {
      await expect(
        addUser(
          {},
          {
            email: 'test@gmail.com',
            password: 'asdf',
          },
          context,
          info
        )
      ).rejects.toThrow('Нууц үг богинохон байна!');
    }
  });

  it('should catch an error', async () => {
    (UserModel.create as jest.Mock).mockImplementation(() => {
      throw new Error('db burned to the ground');
    });
    jest.mock('../../../src/utils/hash-password', () => ({
      hashPassword: jest.fn().mockResolvedValue(null),
    }));

    if (addUser) {
      await expect(
        addUser(
          {},
          {
            email: 'test@gmail.com',
            password: '123123123',
          },
          context,
          info
        )
      ).rejects.toThrow('Бүртгүүлж чадсангүй!');
    }
  });
});

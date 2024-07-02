import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';
import { loginUser } from '@/graphql/resolvers/mutations';
import { hrmsUserModel } from '@/models';
jest.mock('jsonwebtoken');

jest.mock('@/models', () => ({
    hrmsUserModel: {
    findOne: jest.fn().mockReturnValueOnce({ email: 'test',id:'test-id', firstName: 'test', lastName: 'user',role: 'ADMIN' }).mockResolvedValueOnce(null).mockRejectedValueOnce(null),
  },
}));

const input = {
  email: 'test@test.com',
  password: 'test'
};

describe('Login', () => {
  it('it should sign-in and return token', async () => {
    hrmsUserModel.findOne as jest.Mock;

    (jwt.sign as jest.Mock).mockReturnValueOnce('testToken');

    const result = await loginUser!({}, { input }, {}, {} as GraphQLResolveInfo);


    expect(jwt.sign as jest.Mock).toHaveBeenCalledWith({ userEmail: 'test',id:'test-id', firstName: 'test', lastName: 'user', role: 'ADMIN' }, 'secret-key');

    expect(result).toEqual({ token: 'testToken', message: 'Амжилттай нэвтэрлээ' });
  });

  it('it should throw user not found error', async () => {
    try {
      await loginUser!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Имэйл эсвэл нууц үг буруу байна' }, errorTypes.NOT_FOUND));
    }
  });

  it('it should throw error', async () => {
    try {
      await loginUser!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
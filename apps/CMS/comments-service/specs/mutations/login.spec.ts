import { graphqlErrorHandler, errorTypes } from '@/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';
import { cmsLogin } from '@/graphql/resolvers/mutations';
import { cmsUserModel } from '@/models';
jest.mock('jsonwebtoken');

jest.mock('@/models', () => ({
  cmsUserModel: {
    findOne: jest.fn().mockReturnValueOnce({ email: 'test', id: 'test-id', firstName: 'test', lastName: 'user', roles: 'ADMIN' }).mockResolvedValueOnce(null).mockRejectedValueOnce(null),
  },
}));

const input = {
  email: 'test@test.com',
  password: 'test',
};

describe('Login', () => {
  it('it should sign-in and return token', async () => {
    cmsUserModel.findOne as jest.Mock;

    (jwt.sign as jest.Mock).mockReturnValueOnce('testToken');

    const result = await cmsLogin!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(jwt.sign as jest.Mock).toHaveBeenCalledWith({ userEmail: 'test', id: 'test-id', firstName: 'test', lastName: 'user', roles: 'ADMIN' }, 'secret-key');

    expect(result).toEqual({ token: 'testToken', message: 'Амжилттай нэвтэрлээ' });
  });

  it('it should throw user not found error', async () => {
    try {
      await cmsLogin!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Имэйл эсвэл нууц үг буруу байна' }, errorTypes.NOT_FOUND));
    }
  });

  it('it should throw error', async () => {
    try {
      await cmsLogin!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});

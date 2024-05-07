import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { EmployeeModel }from '../../src/models/employee';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';
import { signIn } from '@/graphql/resolvers/mutations/sign-in';

jest.mock('jsonwebtoken');

jest.mock('../../src/models/employee', () => ({
  EmployeeModel: {
    findOne: jest.fn().mockReturnValueOnce({ email: 'test', id: 'user-id', firstName: 'test', lastName: 'user' }).mockResolvedValueOnce(null).mockRejectedValueOnce(null),
  },
}));

const input = {
  emailorPhone: 'test@test.com',
};

describe('Sign in', () => {
  it('it should sign-in and return token', async () => {
    EmployeeModel.findOne as jest.Mock;

    (jwt.sign as jest.Mock).mockReturnValueOnce('testToken');

    const result = await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(EmployeeModel.findOne).toHaveBeenCalledWith({
      $or: [
        { email: 'test@test.com' },
        { phone: 'test@test.com' },
      ],
    });

    expect(jwt.sign as jest.Mock).toHaveBeenCalledWith({ email: 'test', id: 'user-id', firstName: 'test', lastName: 'user' }, 'secret-key');

    expect(result).toEqual({ token: 'testToken', message: 'Амжилттай нэвтэрлээ' });
  });

  it('it should throw user not found error', async () => {
    try {
      await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч алга' }, errorTypes.NOT_FOUND));
    }
  });

  it('it should throw error', async () => {
    try {
      await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
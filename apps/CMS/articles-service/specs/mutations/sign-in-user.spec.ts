import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { signIn } from '@/graphql/resolvers/mutations';
import { UserModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

jest.mock('../../src/models/user.model.ts', () => ({
  UserModel: {
    findOne: jest.fn().mockReturnValueOnce({ email: 'test', _id: 'user-id', name: 'test' }).mockResolvedValueOnce(null).mockRejectedValueOnce(null),
  },
}));

const input = {
  emailOrPhoneNumber: 'test@test.com',
  password: 'password',
};

describe('Sign in', () => {
  it('it should sign-in and return token', async () => {
    UserModel.findOne as jest.Mock;

    (jwt.sign as jest.Mock).mockReturnValueOnce('testToken');

    const result = await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      $or: [
        { email: 'test@test.com', password: 'password' },
        { phoneNumber: 'test@test.com', password: 'password' },
      ],
    });

    expect(jwt.sign as jest.Mock).toHaveBeenCalledWith({ id: 'user-id', name: 'test', email: 'test' }, 'secret-key');

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

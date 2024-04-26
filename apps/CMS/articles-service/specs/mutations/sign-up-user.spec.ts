import { GraphQLResolveInfo } from 'graphql';
import { signUp } from '../../src/graphql/resolvers/mutations/sign-up-user';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
const input = {
  email: 'mockEmail@gmail.com',
  phoneNumber: '99999999',
  password: '12345678',
};

jest.mock('../../src/models', () => ({
  UserModel: {
    findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({ _id: 'test' }),
    create: jest.fn().mockResolvedValueOnce({}).mockRejectedValueOnce(null),
  },
}));

describe('Sign up', () => {
  it('should create a user', async () => {
    const result = await signUp!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      message: 'Хэрэглэгч амжилттай үүслээ',
    });
  });

  it('should throw user exist error', async () => {
    try {
      await signUp!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч байна' }, errorTypes.ALREADY_EXISTS));
    }
  });
  it('should throw error', async () => {
    try {
      await signUp!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
  it('it should throw graphql error', async () => {
    try {
      await signUp!({}, { input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toBeInstanceOf(graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч байна' }, errorTypes.ALREADY_EXISTS));
    }
  });
});

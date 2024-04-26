import { GraphQLResolveInfo } from 'graphql';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { signIn } from '@/graphql/resolvers/mutations';

const input = {
  emailOrPhoneNumber: 'mockData3@gmail.com',
  password: '11111111aB!',
};

jest.mock('../../src/models/user.model.ts', () => ({
  UserModel: {
    findOne: jest
      .fn()
      .mockReturnValueOnce({
        message: 'Амжилттай нэвтэрлээ',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQwNTg3NTR9.LqevD4tmdH-Q6f0I9vTUhVpaYvkmgxxHYPyqi8PQ5oI',
      })
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(null),
  },
}));

describe('Sign up', () => {
  it('it should generate token and return', async () => {
    const result = await signIn!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      message: 'Амжилттай нэвтэрлээ',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQwNTg3NTR9.LqevD4tmdH-Q6f0I9vTUhVpaYvkmgxxHYPyqi8PQ5oI',
    });
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

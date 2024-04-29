import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { deleteUser } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

const mockData = {
  email: 'pinecone10k@gmail.com',
};

jest.mock('../../src/models', () => ({
  UserModel: {
    findOneAndDelete: jest.fn().mockResolvedValueOnce({ email: 'pinecone10k@gmail.com' }).mockResolvedValueOnce(null).mockRejectedValueOnce(null),
  },
}));

describe('delete user', () => {
  it('it should delete user', async () => {
    const result = await deleteUser!({}, { input: mockData }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({ message: 'Хэрэглэгч амжилттай устлаа' });
  });

  it('it should throw user not found error', async () => {
    try {
      await deleteUser!({}, { input: mockData }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Бүртгэлтэй хэрэглэгч алга' }, errorTypes.NOT_FOUND));
    }
  });

  it('it should throw error', async () => {
    try {
      await deleteUser!({}, { input: mockData }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      return graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST);
    }
  });
});

import { UserModel } from '@/graphql/models';
import { deleteUser } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/models', () => ({
  UserModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('User Delete function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should delete user', async () => {
    const input = { _id: 'userId' };
    (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(input);

    const result = await deleteUser!({}, { input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(input);
  });

  it('should throw an error when a user is not found', async () => {
    try {
      await deleteUser({}, { _id: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Internal System Error'));
    }
  });

  it('should throw an error when an error occurs', async () => {
    try {
      await deleteUser({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Internal System Error'));
    }
  });
});

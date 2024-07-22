import { UserModel } from '@/graphql/models';
import { deleteUser } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/graphql/models', () => ({
  UserModel: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('Delete User', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a class', async () => {
    const mockuser = {
      _id: '1',
      firstName: 'test',
      lastName: 'testlast',
      email: '23@gmail.com',
      password: '123',
      roles: ['STUDENT'],
    };
    (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockuser);

    const result = await deleteUser({}, { id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockuser);
  });

  it('should throw an error when a user is not found', async () => {
    try {
      await deleteUser({}, { _id: '' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not delete user'));
    }
  });

  it('should throw an error when an error occurs', async () => {
    try {
      await deleteUser({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Could not delete user'));
    }
  });
});

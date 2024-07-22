import { GraphQLError, GraphQLResolveInfo } from 'graphql';
import { getUserById } from '@/graphql/resolvers/queries/get-user-by-id';

jest.mock('@/graphql/models', () => ({
  UserModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        _id: '133',
        firstName: 'George',
        lastName: 'Jorge',
        email: 'test@hotmail.com',
        roles: ['ADMIN'],
        password: 'supersecret',
      })
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));

describe('get user', () => {
  it('should get a user', async () => {
    const result = await getUserById!({}, { _id: '133' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '133',
      firstName: 'George',
      lastName: 'Jorge',
      email: 'test@hotmail.com',
      roles: ['ADMIN'],
      password: 'supersecret',
    });
  });

  it('should throw an error if the user cannot be found', async () => {
    try {
      await getUserById!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('User not found'));
    }
  });

  it('should throw an error if an error occurs during user retrieval', async () => {
    try {
      await getUserById!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('User not found'));
    }
  });
});

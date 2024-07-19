import { graphqlErrorHandler, errorTypes } from '@/graphql/resolvers/error';
import { getCmsUser } from '@/graphql/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models', () => ({
  cmsUserModel: {
    findById: jest
      .fn()
      .mockReturnValueOnce({
        _id: '32445',
        firstName: 'Bataa',
        lastName: 'Dorjoo',
        email: 'test@gmail.com',
        role: 'ADMIN',
        password: 'password',
      })
      .mockResolvedValueOnce(undefined)
      .mockReturnValueOnce(null),
  },
}));

describe('getCmsUser', () => {
  it('should get a user', async () => {
    const result = await getCmsUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual({
      _id: '32445',
      firstName: 'Bataa',
      lastName: 'Dorjoo',
      email: 'test@gmail.com',
      role: 'ADMIN',
      password: 'password',
    });
  });

  it('should throw an error if the user cannot be found', async () => {
    try {
      await getCmsUser!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it('should throw an error if an error occurs during user retrieval', async () => {
    try {
      await getCmsUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
    }
  });
});

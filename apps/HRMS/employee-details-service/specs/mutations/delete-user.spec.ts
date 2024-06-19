import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import {deletedUser } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/user.model', () => ({
  UserModel: {
    findByIdAndDelete: jest
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
describe('delete user', () => {
  it('should delete a user', async () => {
    const result = await deletedUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
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
      await deletedUser!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });
  it('should throw an error if an error occurs during user retrieval', async () => {
    try {
      await deletedUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { updatedHrmsUser } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models', () => ({
  hrmsUserModel: {
    findByIdAndUpdate: jest
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

const input = {
  firstName: 'Bataa',
  lastName: 'Dorjoo',
  email: 'test@gmail.com',
  role: 'ADMIN',
  password: 'password',
};
describe('update user', () => {
  it('should update a user', async () => {
    const result = await updatedHrmsUser!({}, { _id: '1', input }, {}, {} as GraphQLResolveInfo);
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
      await updatedHrmsUser!({}, { _id: '2', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });

  it('should throw an error if an error occurs during user retrieval', async () => {
    try {
      await updatedHrmsUser!({}, { _id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});
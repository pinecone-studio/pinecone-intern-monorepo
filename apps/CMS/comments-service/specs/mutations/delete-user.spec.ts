import { graphqlErrorHandler, errorTypes } from '@/graphql/resolvers/error';
import { deletedCmsUser } from '@/graphql/resolvers/mutations';
import { cmsUserModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../src/models/cms-user.model');
describe('delete user', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should delete a user', async () => {
    const mockUser = {
      _id: '32445',
      firstName: 'Bataa',
      lastName: 'Dorjoo',
      email: 'test@gmail.com',
      role: 'ADMIN',
      password: 'password',
    };
    cmsUserModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce(mockUser);
    const result = await deletedCmsUser!({}, { _id: '32445' }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if the user cannot be found', async () => {
    try {
      await deletedCmsUser!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.NOT_FOUND));
    }
  });
  it('should throw an error if an error occurs during user retrieval', async () => {
    try {
      await deletedCmsUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
    }
  });
});

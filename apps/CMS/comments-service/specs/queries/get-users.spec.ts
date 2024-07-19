import { graphqlErrorHandler, errorTypes } from '@/graphql/resolvers/error';
import { getCmsUsers } from '@/graphql/resolvers/queries/user-all-query';
import { cmsUserModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models', () => ({
  cmsUserModel: { find: jest.fn() },
}));

describe('getCmsUsers', () => {
  it('should return all users from cmsUserModel', async () => {
    const mockUser = [
      {
        _id: '32445',
        firstName: 'Bataa',
        lastName: 'Dorjoo',
        email: 'test@gmail.com',
        role: 'ADMIN',
        password: 'password',
      },
    ];

    (cmsUserModel.find as jest.Mock).mockResolvedValue(mockUser);
    const result = await getCmsUsers!({}, {}, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockUser);
    expect(cmsUserModel.find).toHaveBeenCalledTimes(1);
  });
  it('Should handle error when cmsUserModel.find fails', async () => {
    const mockError = 'can not find users';
    (cmsUserModel.find as jest.Mock).mockRejectedValue(new Error(mockError));

    await expect(getCmsUsers!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
  });
});

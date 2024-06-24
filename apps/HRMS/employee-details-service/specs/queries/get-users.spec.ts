import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getHrmsUsers } from '@/graphql/resolvers/queries/user-all-query';
import { hrmsUserModel } from '@/models';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models', () => ({
  hrmsUserModel: { find: jest.fn() },
}));

describe('getHrmsUsers', () => {
  it('should return all users from hrmsUserModel', async () => {
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

    (hrmsUserModel.find as jest.Mock).mockResolvedValue(mockUser);
    const result = await getHrmsUsers!({}, {}, {}, {} as GraphQLResolveInfo);
    console.log('RR', result);
    expect(result).toEqual(mockUser);
    expect(hrmsUserModel.find).toHaveBeenCalledTimes(1);
  });
  it('Should handle error when hrmsUserModel.find fails', async () => {
    const mockError = 'can not find users';
    (hrmsUserModel.find as jest.Mock).mockRejectedValue(new Error(mockError));

    await expect(getHrmsUsers!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
  });
});

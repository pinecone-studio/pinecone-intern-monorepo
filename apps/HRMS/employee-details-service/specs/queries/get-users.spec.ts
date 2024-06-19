import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { getUsers } from '@/graphql/resolvers/queries/user-all-query';
import {UserModel} from '@/models/user.model';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/user.model', () => ({
  UserModel:{find: jest.fn(),
    
  }
}));

describe('getUsers', () => {
  it('should return all users from UserModel', async () => {
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

    (UserModel.find as jest.Mock).mockResolvedValue(mockUser);
    const result = await getUsers!({}, {}, {}, {} as GraphQLResolveInfo);
    console.log("RR",result)
    expect(result).toEqual(mockUser);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });
  it('Should handle error when UserModel.find fails', async () => {

    const mockError = 'can not find users';
    (UserModel.find as jest.Mock).mockRejectedValue(new Error(mockError));

    await expect(getUsers!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow
    (graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.INTERVAL_SERVER_ERROR));
  
  
  });
});


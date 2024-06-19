import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { createUser } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import {UserModel} from '@/models/user.model';

jest.mock('@/models/user.model', () => ({
  UserModel: {
   create: jest.fn(),
  }
 }));

 const input = {
  firstName: 'Bataa',
  lastName: 'Dorjoo',
  email: 'test@gmail.com',
  role: 'ADMIN',
  password: 'password',
};
describe('create user', () => {
  it('should create a user', async () => {

 
    (UserModel.create as jest.Mock).mockResolvedValue(input);
    const result = await createUser!({}, { input }, {}, {} as GraphQLResolveInfo);
 

    expect(result).toEqual(input);
  });

  it("should throw an error if the user doesn't exist", async () => {
    const mockError = 'can not find users';
    (UserModel.create as jest.Mock).mockRejectedValue(new Error(mockError));

    await expect(createUser!({}, {input}, {}, {} as GraphQLResolveInfo)).rejects.toThrow
    (graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
  });
});


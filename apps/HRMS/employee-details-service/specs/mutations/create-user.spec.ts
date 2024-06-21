import graphqlErrorHandler, { errorTypes } from '@/graphql/resolvers/error';
import { createHrmsUser } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import { hrmsUserModel } from '@/models';

jest.mock('@/models', () => ({
  hrmsUserModel: {
    create: jest.fn(),
  },
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
    (hrmsUserModel.create as jest.Mock).mockResolvedValue(input);
    const result = await createHrmsUser!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(input);
  });

  it("should throw an error if the user doesn't exist", async () => {
    const mockError = 'can not find users';
    (hrmsUserModel.create as jest.Mock).mockRejectedValue(new Error(mockError));

    await expect(createHrmsUser!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
  });
});

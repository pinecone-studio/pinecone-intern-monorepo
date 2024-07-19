import { graphqlErrorHandler, errorTypes } from '@/graphql/resolvers/error';
import { createCmsUser } from '@/graphql/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';
import { cmsUserModel } from '@/models';

jest.mock('@/models', () => ({
  cmsUserModel: {
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
    (cmsUserModel.create as jest.Mock).mockResolvedValue(input);
    const result = await createCmsUser!({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(input);
  });

  it("should throw an error if the user doesn't exist", async () => {
    const mockError = 'can not find users';
    (cmsUserModel.create as jest.Mock).mockRejectedValue(new Error(mockError));

    await expect(createCmsUser!({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrow(graphqlErrorHandler({ message: 'Алдаа гарлаа' }, errorTypes.BAD_REQUEST));
  });
});

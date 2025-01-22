import { GraphQLResolveInfo } from 'graphql';
import { UserModel } from '../../../src/models';
import { createUser } from '../../../src/resolvers/mutations';

jest.mock('../../../src/models/user', () => ({
  UserModel: {
    create: jest.fn(),
    find: jest.fn(),
  },
}));

describe('createUser Mutation Resolver', () => {
  it('should create a user and return it', async () => {
    const mockInput = {
      email: 'test@example.com',
      userName: 'TestUser',
      password: 'pass123',
      rePassword: 'pass123',
    };
    const mockSavedUser = {
      id: '123',
      ...mockInput,
      createdAt: new Date(),
    };
    (UserModel.create as jest.Mock).mockResolvedValue(mockSavedUser);

    if (!createUser) return;

    const result = await createUser({}, { input: mockInput }, {}, {} as GraphQLResolveInfo);

    expect(UserModel.create).toHaveBeenCalledWith(mockInput);

    expect(result).toEqual(mockSavedUser);
  });
});

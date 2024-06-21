import glmsUserModel from '@/graphql/models/user.model';
import { createGlmsUser } from '@/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';

jest.mock('@/graphql/models/user.model', () => ({
  create: jest.fn(),
}));
describe('createUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create an user and return its user', async () => {
    const CreateUserInput = { firstName: 'mnde', lastName: 'bro', email: 'emailCreate@nest.edu.mn', password: 'passwordCreate', roles: 'TEACHER', avatar: 'dagadf' };
    const mockCreatedUser = { ...CreateUserInput, _id: '12' };
    glmsUserModel.create.mockResolvedValue(mockCreatedUser);

    const mockArgs = { input: CreateUserInput };

    const result = await createGlmsUser(null, mockArgs);

    expect(result).toEqual(mockCreatedUser);

    expect(glmsUserModel.create).toHaveBeenCalledWith(CreateUserInput);
  });

  it('should throw a GraphQLError on unsuccessful user creation', async () => {
    const CreateUserInput = { firstName: 'mnde', lastName: 'bro', email: 'emailCreate@nest.edu.mn', password: 'passwordCreate', roles: 'TEACHER', avatar: 'dagadf' };
    glmsUserModel.create.mockResolvedValue(null);

    const mockArgs = { input: CreateUserInput };

    await expect(createGlmsUser(null, mockArgs)).rejects.toThrow(GraphQLError);
  });

  it('should throw a GraphQLError on error during user creation', async () => {
    const CreateUserInput = { firstName: 'mnde', lastName: 'bro', email: 'emailCreate@nest.edu.mn', password: 'passwordCreate', roles: 'TEACHER', avatar: 'dagadf' };
    const mockError = new Error('Database connection error');
    glmsUserModel.create.mockRejectedValue(mockError);

    const mockArgs = { input: CreateUserInput };

    await expect(createGlmsUser(null, mockArgs)).rejects.toThrow(GraphQLError);
  });
});

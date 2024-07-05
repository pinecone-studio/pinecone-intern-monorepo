
import glmsUserModel from '@/graphql/models/user.model';
import { updateGlmsUser } from '@/graphql/resolvers/mutations';
import { GraphQLError } from 'graphql';

// Mock glmsUserModel
jest.mock('@/graphql/models/user.model', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('updateGlmsUser resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls before each test
  });

  it('should update a GLMS user successfully', async () => {
    const mockUserId = 'mockUserId';
    const mockUpdateInput = {
      firstName: 'John',
      lastName: 'Doe',
      roles: 'TEACHER',
      email: 'john.doe@example.com',
      password: 'password123',
      avatar: 'avatar.jpg',
    };

    // Mock the return value of findByIdAndUpdate
    const mockUpdatedUser = {
      _id: mockUserId,
      ...mockUpdateInput,
    };
    glmsUserModel.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

    // Mock arguments passed to resolver
    const mockArgs = {
      _id: mockUserId,
      updateInput: mockUpdateInput,
    };

    // Invoke the resolver function
    const result = await updateGlmsUser({}, mockArgs);

    // Assert the result
    expect(result).toEqual(mockUpdatedUser);

    // Verify findByIdAndUpdate was called with correct arguments
    expect(glmsUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      mockUserId,
      {
        firstName: mockUpdateInput.firstName,
        lastName: mockUpdateInput.lastName,
        roles: mockUpdateInput.roles,
        email: mockUpdateInput.email,
        password: mockUpdateInput.password,
        avatar: mockUpdateInput.avatar,
      },
      { new: true }
    );
  });

  it('should throw a GraphQLError when user is not found', async () => {
    const mockUserId = 'nonExistingUserId';
    const mockUpdateInput = {
      firstName: 'John',
      lastName: 'Doe',
      roles: 'TEACHER',
      email: 'john.doe@example.com',
      password: 'password123',
      avatar: 'avatar.jpg',
    };

    // Mock findByIdAndUpdate to return null (user not found)
    glmsUserModel.findByIdAndUpdate.mockResolvedValue(null);

    // Mock arguments passed to resolver
    const mockArgs = {
      _id: mockUserId,
      updateInput: mockUpdateInput,
    };

    // Invoke the resolver function
    await expect(updateGlmsUser({}, mockArgs)).rejects.toThrow(GraphQLError);
  });

  it('should throw a GraphQLError on database error', async () => {
    const mockUserId = 'mockUserId';
    const mockUpdateInput = {
      firstName: 'John',
      lastName: 'Doe',
      roles: 'TEACHER',
      email: 'john.doe@example.com',
      password: 'password123',
      avatar: 'avatar.jpg',
    };

    // Mock findByIdAndUpdate to throw an error
    const mockError = new Error('Database error');
    glmsUserModel.findByIdAndUpdate.mockRejectedValue(mockError);

    // Mock arguments passed to resolver
    const mockArgs = {
      _id: mockUserId,
      updateInput: mockUpdateInput,
    };

    // Invoke the resolver function
    await expect(updateGlmsUser({}, mockArgs)).rejects.toThrow(GraphQLError);
  });
});
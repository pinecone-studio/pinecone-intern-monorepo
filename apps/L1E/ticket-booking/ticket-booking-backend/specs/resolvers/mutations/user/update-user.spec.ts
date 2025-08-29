import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { UserType } from '../../../../src/models/user.model';

describe('Update User Mutation', () => {
  let testUser: UserType;

  beforeEach(async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };
    testUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
  });

  afterEach(async () => {
    if (testUser?._id) {
      await User.deleteOne({ _id: testUser._id });
    }
  });

  test('Should update user fullName successfully', async () => {
    const updateData = {
      _id: testUser._id.toString(),
      fullName: 'Updated Test User'
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser).toBeDefined();
    expect(updatedUser.fullName).toBe('Updated Test User');
    expect(updatedUser.email).toBe(testUser.email);
    expect(updatedUser.role).toBe(testUser.role);
    expect(updatedUser.phone).toBe(testUser.phone);
    expect(updatedUser._id.toString()).toBe(testUser._id.toString());
  });

  test('Should update user email successfully', async () => {
    const newEmail = `updated${Date.now()}${Math.random()}@example.com`;
    const updateData = {
      _id: testUser._id.toString(),
      email: newEmail
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser.email).toBe(newEmail);
    expect(updatedUser.fullName).toBe(testUser.fullName);
  });

  test('Should update user role successfully', async () => {
    const updateData = {
      _id: testUser._id.toString(),
      role: 'ADMIN'
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser.role).toBe('ADMIN');
  });

  test('Should update user phone successfully', async () => {
    const updateData = {
      _id: testUser._id.toString(),
      phone: '9876543210'
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser.phone).toBe('9876543210');
  });

  test('Should update multiple fields at once', async () => {
    const updateData = {
      _id: testUser._id.toString(),
      fullName: 'Multi Updated User',
      email: `multi${Date.now()}${Math.random()}@example.com`,
      role: 'ADMIN',
      phone: '5555555555'
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser.fullName).toBe('Multi Updated User');
    expect(updatedUser.email).toBe(updateData.email);
    expect(updatedUser.role).toBe('ADMIN');
    expect(updatedUser.phone).toBe('5555555555');
  });

  test('Should throw error for non-existent user', async () => {
    const updateData = {
      _id: '507f1f77bcf86cd799439011',
      fullName: 'Updated Name'
    };

    await expect(userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('User not found');
  });

  test('Should handle partial updates with undefined values', async () => {
    const updateData = {
      _id: testUser._id.toString(),
      fullName: 'Partial Update',
      email: undefined,
      role: undefined,
      phone: undefined
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser.fullName).toBe('Partial Update');
    expect(updatedUser.email).toBe(testUser.email);
    expect(updatedUser.role).toBe(testUser.role);
    expect(updatedUser.phone).toBe(testUser.phone);
  });

  test('Should handle empty update object', async () => {
    const updateData = {
      _id: testUser._id.toString()
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser).toBeDefined();
    expect(updatedUser._id.toString()).toBe(testUser._id.toString());
  });

  test('Should handle errors and edge cases', async () => {
    const originalFindByIdAndUpdate = User.findByIdAndUpdate;
    

    User.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));
    await expect(userMutations.updateUser({} as ResolversParentTypes['Mutation'], { _id: testUser._id.toString(), fullName: 'Updated User Name' }))
      .rejects.toThrow('Database error');


    User.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Connection timeout'));
    await expect(userMutations.updateUser({} as ResolversParentTypes['Mutation'], { _id: testUser._id.toString(), fullName: 'Updated User Name' }))
      .rejects.toThrow('Connection timeout');


    User.findByIdAndUpdate = originalFindByIdAndUpdate;


    await expect(userMutations.updateUser({} as ResolversParentTypes['Mutation'], { _id: 'invalid-object-id', fullName: 'Updated User Name' }))
      .rejects.toThrow('Invalid ObjectId format');
  });
});

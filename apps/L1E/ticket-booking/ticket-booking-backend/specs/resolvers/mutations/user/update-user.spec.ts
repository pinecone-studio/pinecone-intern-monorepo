import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Update User Mutation', () => {

  test('Should update user successfully', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };

    const createdUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    
    const updateData = {
      _id: createdUser._id.toString(),
      fullName: 'Updated User',
      email: `updated${Date.now()}${Math.random()}@example.com`
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser).toBeDefined();
    expect(updatedUser.fullName).toBe(updateData.fullName);
    expect(updatedUser.email).toBe(updateData.email);
    expect(updatedUser.role).toBe(userData.role);

    await User.deleteOne({ _id: createdUser._id });
  });

  test('Should update only provided fields', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };

    const createdUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    
    const updateData = {
      _id: createdUser._id.toString(),
      fullName: 'Updated User'
    };

    const updatedUser = await userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedUser.fullName).toBe(updateData.fullName);
    expect(updatedUser.email).toBe(userData.email);
    expect(updatedUser.role).toBe(userData.role);

    await User.deleteOne({ _id: createdUser._id });
  });

  test('Should throw error for non-existent user', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';
    const updateData = {
      _id: nonExistentId,
      fullName: 'Updated User'
    };

    await expect(userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData)).rejects.toThrow('User not found');
  });

  test('Should handle invalid role update', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER'
    };

    const createdUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    
    const updateData = {
      _id: createdUser._id.toString(),
      role: 'INVALID_ROLE'
    };

    await expect(userMutations.updateUser({} as ResolversParentTypes['Mutation'], updateData)).rejects.toThrow();

    await User.deleteOne({ _id: createdUser._id });
  });
});

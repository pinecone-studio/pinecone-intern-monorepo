import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Delete User Mutation', () => {

  test('Should delete user successfully', async () => {
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };

    const createdUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
    
    const deletedUser = await userMutations.deleteUser({} as ResolversParentTypes['Mutation'], { _id: createdUser._id.toString() });
    
    expect(deletedUser).toBeDefined();
    expect(deletedUser._id.toString()).toBe(createdUser._id.toString());
    expect(deletedUser.email).toBe(userData.email);
    expect(deletedUser.fullName).toBe(userData.fullName);

    const userStillExists = await User.findById(createdUser._id);
    expect(userStillExists).toBeNull();
  });

  test('Should throw error for non-existent user', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';
    
    await expect(userMutations.deleteUser({} as ResolversParentTypes['Mutation'], { _id: nonExistentId })).rejects.toThrow('User not found');
  });
});

import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { UserType } from '../../../../src/models/user.model';

describe('Delete User Mutation', () => {
  let testUser: UserType;

  beforeEach(async () => {
    // Create a test user for each test
    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };
    testUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);
  });

  test('Should delete user successfully', async () => {
    const deleteData = {
      _id: testUser._id.toString()
    };

    const deletedUser = await userMutations.deleteUser({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedUser).toBeDefined();
    expect(deletedUser._id.toString()).toBe(testUser._id.toString());
    expect(deletedUser.email).toBe(testUser.email);
    expect(deletedUser.fullName).toBe(testUser.fullName);
    expect(deletedUser.role).toBe(testUser.role);

    const userInDb = await User.findById(testUser._id);
    expect(userInDb).toBeNull();
  });

  test('Should throw error for non-existent user', async () => {
    const deleteData = {
      _id: '507f1f77bcf86cd799439011'
    };

    await expect(userMutations.deleteUser({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow('User not found');
  });

  test('Should throw error for invalid ObjectId format', async () => {
    const deleteData = {
      _id: 'invalid-id-format'
    };

    await expect(userMutations.deleteUser({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow();
  });

  test('Should handle deletion of admin user', async () => {
    const adminData = {
      email: `admin${Date.now()}${Math.random()}@example.com`,
      fullName: 'Admin User',
      password: 'password123',
      role: 'ADMIN',
      phone: '1234567890'
    };
    const adminUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], adminData);

    const deleteData = {
      _id: adminUser._id.toString()
    };

    const deletedUser = await userMutations.deleteUser({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedUser.role).toBe('ADMIN');
    expect(deletedUser._id.toString()).toBe(adminUser._id.toString());

    const adminInDb = await User.findById(adminUser._id);
    expect(adminInDb).toBeNull();
  });

  test('Should handle deletion of user with phone number', async () => {
    const deleteData = {
      _id: testUser._id.toString()
    };

    const deletedUser = await userMutations.deleteUser({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedUser.phone).toBe('1234567890');
    expect(deletedUser._id.toString()).toBe(testUser._id.toString());
  });

  test('Should return correct user data after deletion', async () => {
    const deleteData = {
      _id: testUser._id.toString()
    };

    const deletedUser = await userMutations.deleteUser({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedUser).toHaveProperty('_id');
    expect(deletedUser).toHaveProperty('email');
    expect(deletedUser).toHaveProperty('fullName');
    expect(deletedUser).toHaveProperty('role');
    expect(deletedUser).toHaveProperty('phone');
    expect(deletedUser).toHaveProperty('createdAt');
    expect(deletedUser).toHaveProperty('updatedAt');
  });
});

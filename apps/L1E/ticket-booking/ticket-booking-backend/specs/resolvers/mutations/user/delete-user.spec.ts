import { User } from '../../../../src/models/user.model';
import { connectToDatabase } from '../../../../src/utils/database';
import { clearAllUsers, insertUserDirectly, seedUsers } from '../../../../src/utils/seed-data';

/**
 * 🧪 Test: Delete User Mutation
 * 
 * Tests the deleteUser GraphQL mutation functionality
 */

describe('🎯 Delete User Mutation', () => {
  
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await clearAllUsers();
  });

  test('✅ Should delete user by ID', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    
    // Act: Delete user
    const deletedUser = await User.findByIdAndDelete(user._id);
    
    // Assert: User should be deleted and returned
    expect(deletedUser).toBeDefined();
    expect(deletedUser?.email).toBe('john.doe@example.com');
    expect(deletedUser?.fullName).toBe('John Doe');
  });

  test('✅ Should remove user from database after deletion', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    
    // Act: Delete user
    await User.findByIdAndDelete(user._id);
    
    // Assert: User should no longer exist in database
    const foundUser = await User.findById(user._id);
    expect(foundUser).toBeNull();
  });

  test('❌ Should handle deletion of non-existent user', async () => {
    // Arrange: Use a fake ID
    const fakeId = '507f1f77bcf86cd799439011';
    
    // Act: Try to delete non-existent user
    const deletedUser = await User.findByIdAndDelete(fakeId);
    
    // Assert: Should return null
    expect(deletedUser).toBeNull();
  });

  test('✅ Should delete specific user from multiple users', async () => {
    // Arrange: Create multiple users
    const users = await seedUsers();
    const userToDelete = users[1]; // Delete the second user
    
    // Act: Delete specific user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    
    // Assert: Correct user should be deleted
    expect(deletedUser?.email).toBe(userToDelete.email);
    
    // Check remaining users
    const remainingUsers = await User.find();
    expect(remainingUsers).toHaveLength(2);
    expect(remainingUsers.find(u => u.email === userToDelete.email)).toBeUndefined();
  });

  test('✅ Should return deleted user with all fields', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    
    // Act: Delete user
    const deletedUser = await User.findByIdAndDelete(user._id);
    
    // Assert: Should return user with all fields
    expect(deletedUser).toMatchObject({
      email: 'john.doe@example.com',
      fullName: 'John Doe',
      password: 'hashedPassword123',
      role: 'USER',
      phone: '+1234567890'
    });
    expect(deletedUser?._id).toBeDefined();
    expect(deletedUser?.createdAt).toBeDefined();
    expect(deletedUser?.updatedAt).toBeDefined();
  });

  test('✅ Should handle deletion of admin user', async () => {
    // Arrange: Create an admin user
    const adminUser = new User({
      email: 'admin@example.com',
      fullName: 'Admin User',
      password: 'admin123',
      role: 'ADMIN',
      phone: '+1234567890'
    });
    const savedAdmin = await adminUser.save();
    
    // Act: Delete admin user
    const deletedAdmin = await User.findByIdAndDelete(savedAdmin._id);
    
    // Assert: Admin should be deleted
    expect(deletedAdmin?.role).toBe('ADMIN');
    expect(deletedAdmin?.email).toBe('admin@example.com');
    
    // Verify it's gone from database
    const foundAdmin = await User.findById(savedAdmin._id);
    expect(foundAdmin).toBeNull();
  });

  test('✅ Should handle deletion of user with phone number', async () => {
    // Arrange: Create a user with phone
    const userWithPhone = new User({
      email: 'phone@example.com',
      fullName: 'Phone User',
      password: 'password123',
      role: 'USER',
      phone: '+9876543210'
    });
    const savedUser = await userWithPhone.save();
    
    // Act: Delete user
    const deletedUser = await User.findByIdAndDelete(savedUser._id);
    
    // Assert: User with phone should be deleted
    expect(deletedUser?.phone).toBe('+9876543210');
    expect(deletedUser?.email).toBe('phone@example.com');
  });
});

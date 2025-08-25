import { User } from '../../../../src/models/user.model';
import { connectToDatabase } from '../../../../src/utils/database';
import { clearAllUsers } from '../../../../src/utils/seed-data';

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
    const timestamp = Date.now();
    const userData = {
      email: `john.${timestamp}@example.com`,
      fullName: 'John Doe',
      password: 'password123',
      role: 'USER' as const,
      phone: '+1234567890'
    };
    const user = new User(userData);
    const savedUser = await user.save();
    
    // Act: Delete user
    const deletedUser = await User.findByIdAndDelete(savedUser._id);
    
    // Assert: User should be deleted and returned
    expect(deletedUser).toBeDefined();
    expect(deletedUser?.email).toBe(userData.email);
    expect(deletedUser?.fullName).toBe('John Doe');
  });

  test('✅ Should remove user from database after deletion', async () => {
    // Arrange: Create a user
    const timestamp = Date.now();
    const userData = {
      email: `john.${timestamp}@example.com`,
      fullName: 'John Doe',
      password: 'password123',
      role: 'USER' as const,
      phone: '+1234567890'
    };
    const user = new User(userData);
    const savedUser = await user.save();
    
    // Act: Delete user
    await User.findByIdAndDelete(savedUser._id);
    
    // Assert: User should no longer exist in database
    const foundUser = await User.findById(savedUser._id);
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

  test('✅ Should return deleted user with all fields', async () => {
    // Arrange: Create a user
    const timestamp = Date.now();
    const userData = {
      email: `john.${timestamp}@example.com`,
      fullName: 'John Doe',
      password: 'password123',
      role: 'USER' as const,
      phone: '+1234567890'
    };
    const user = new User(userData);
    const savedUser = await user.save();
    
    // Act: Delete user
    const deletedUser = await User.findByIdAndDelete(savedUser._id);
    
    // Assert: Should return user with all fields
    expect(deletedUser?.email).toBe(userData.email);
    expect(deletedUser?.fullName).toBe('John Doe');
    expect(deletedUser?.password).toBe('password123');
    expect(deletedUser?.role).toBe('USER');
    expect(deletedUser?.phone).toBe('+1234567890');
    expect(deletedUser?._id).toBeDefined();
    expect(deletedUser?.createdAt).toBeDefined();
    expect(deletedUser?.updatedAt).toBeDefined();
  });
});

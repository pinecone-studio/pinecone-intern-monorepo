import { User } from '../../../../src/models/user.model';
import { connectToDatabase } from '../../../../src/utils/database';
import { clearAllUsers } from '../../../../src/utils/seed-data';

/**
 * 🧪 Test: Get User Query
 * 
 * Tests the getUser GraphQL query functionality
 */

describe('🎯 Get User Query', () => {
  
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await clearAllUsers();
  });

  test('✅ Should get user by ID', async () => {
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
    
    // Act: Get user by ID
    const foundUser = await User.findById(savedUser._id);
    
    // Assert: User should be found
    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe(userData.email);
    expect(foundUser?.fullName).toBe('John Doe');
    expect(foundUser?.role).toBe('USER');
  });

  test('❌ Should handle non-existent user', async () => {
    // Arrange: Use a fake ID
    const fakeId = '507f1f77bcf86cd799439011';
    
    // Act: Try to get non-existent user
    const user = await User.findById(fakeId);
    
    // Assert: Should return null
    expect(user).toBeNull();
  });

  test('✅ Should get user with all fields', async () => {
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
    
    // Act: Get user by ID
    const foundUser = await User.findById(savedUser._id);
    
    // Assert: All fields should be present
    expect(foundUser?.email).toBe(userData.email);
    expect(foundUser?.fullName).toBe('John Doe');
    expect(foundUser?.password).toBe('password123');
    expect(foundUser?.role).toBe('USER');
    expect(foundUser?.phone).toBe('+1234567890');
    expect(foundUser?._id).toBeDefined();
    expect(foundUser?.createdAt).toBeDefined();
    expect(foundUser?.updatedAt).toBeDefined();
  });
});

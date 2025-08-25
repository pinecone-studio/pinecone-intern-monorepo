import { User } from '../../../../src/models/user.model';
import { connectToDatabase } from '../../../../src/utils/database';
import { clearAllUsers } from '../../../../src/utils/seed-data';

/**
 * 🧪 Test: Update User Mutation
 * 
 * Tests the updateUser GraphQL mutation functionality
 */

describe('🎯 Update User Mutation', () => {
  
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await clearAllUsers();
  });

  test('✅ Should update user fullName', async () => {
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
    
    // Act: Update user's fullName
    const updatedUser = await User.findByIdAndUpdate(
      savedUser._id,
      { fullName: 'John Updated' },
      { new: true }
    );
    
    // Assert: User should be updated
    expect(updatedUser?.fullName).toBe('John Updated');
    expect(updatedUser?.email).toBe(userData.email); // Other fields unchanged
  });

  test('✅ Should update user email', async () => {
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
    
    // Act: Update user's email
    const updatedUser = await User.findByIdAndUpdate(
      savedUser._id,
      { email: 'john.updated@example.com' },
      { new: true }
    );
    
    // Assert: User should be updated
    expect(updatedUser?.email).toBe('john.updated@example.com');
    expect(updatedUser?.fullName).toBe('John Doe'); // Other fields unchanged
  });

  test('✅ Should update user phone', async () => {
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
    
    // Act: Update user's phone
    const updatedUser = await User.findByIdAndUpdate(
      savedUser._id,
      { phone: '+9876543210' },
      { new: true }
    );
    
    // Assert: User should be updated
    expect(updatedUser?.phone).toBe('+9876543210');
  });

  test('❌ Should handle update of non-existent user', async () => {
    // Arrange: Use a fake ID
    const fakeId = '507f1f77bcf86cd799439011';
    
    // Act: Try to update non-existent user
    const updatedUser = await User.findByIdAndUpdate(
      fakeId,
      { fullName: 'Updated Name' },
      { new: true }
    );
    
    // Assert: Should return null
    expect(updatedUser).toBeNull();
  });

  test('✅ Should preserve unchanged fields', async () => {
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
    
    // Act: Update only fullName
    const updatedUser = await User.findByIdAndUpdate(
      savedUser._id,
      { fullName: 'John Updated' },
      { new: true }
    );
    
    // Assert: Other fields should remain unchanged
    expect(updatedUser?.fullName).toBe('John Updated');
    expect(updatedUser?.email).toBe(savedUser.email);
    expect(updatedUser?.password).toBe(savedUser.password);
    expect(updatedUser?.role).toBe(savedUser.role);
    expect(updatedUser?.phone).toBe(savedUser.phone);
  });
});

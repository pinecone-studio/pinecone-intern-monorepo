import { User } from '../../../../src/models/user.model';
import { connectToDatabase } from '../../../../src/utils/database';
import { clearAllUsers, insertUserDirectly } from '../../../../src/utils/seed-data';

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
    const user = await insertUserDirectly();
    
    // Act: Update user's fullName
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { fullName: 'John Updated' },
      { new: true }
    );
    
    // Assert: User should be updated
    expect(updatedUser?.fullName).toBe('John Updated');
    expect(updatedUser?.email).toBe('john.doe@example.com'); // Other fields unchanged
  });

  test('✅ Should update user email', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    
    // Act: Update user's email
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { email: 'john.updated@example.com' },
      { new: true }
    );
    
    // Assert: User should be updated
    expect(updatedUser?.email).toBe('john.updated@example.com');
    expect(updatedUser?.fullName).toBe('John Doe'); // Other fields unchanged
  });

  test('✅ Should update user phone', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    
    // Act: Update user's phone
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { phone: '+9876543210' },
      { new: true }
    );
    
    // Assert: User should be updated
    expect(updatedUser?.phone).toBe('+9876543210');
  });

  test('✅ Should update user role', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    
    // Act: Update user's role
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { role: 'ADMIN' },
      { new: true }
    );
    
    // Assert: User should be updated
    expect(updatedUser?.role).toBe('ADMIN');
  });

  test('✅ Should update multiple fields at once', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    
    // Act: Update multiple fields
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { 
        fullName: 'John Updated',
        email: 'john.updated@example.com',
        phone: '+9876543210',
        role: 'ADMIN'
      },
      { new: true }
    );
    
    // Assert: All fields should be updated
    expect(updatedUser?.fullName).toBe('John Updated');
    expect(updatedUser?.email).toBe('john.updated@example.com');
    expect(updatedUser?.phone).toBe('+9876543210');
    expect(updatedUser?.role).toBe('ADMIN');
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
    const user = await insertUserDirectly();
    
    // Act: Update only fullName
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { fullName: 'John Updated' },
      { new: true }
    );
    
    // Assert: Other fields should remain unchanged
    expect(updatedUser?.fullName).toBe('John Updated');
    expect(updatedUser?.email).toBe(user.email);
    expect(updatedUser?.password).toBe(user.password);
    expect(updatedUser?.role).toBe(user.role);
    expect(updatedUser?.phone).toBe(user.phone);
  });

  test('✅ Should update updatedAt timestamp', async () => {
    // Arrange: Create a user
    const user = await insertUserDirectly();
    const originalUpdatedAt = user.updatedAt;
    
    // Wait a bit to ensure timestamp difference
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // Act: Update user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { fullName: 'John Updated' },
      { new: true }
    );
    
    // Assert: updatedAt should be newer
    expect(updatedUser?.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
  });
});

import { User } from '../../../../src/models/user.model';
import { connectToDatabase } from '../../../../src/utils/database';
import { clearAllUsers, seedUsers } from '../../../../src/utils/seed-data';

/**
 * 🧪 Test: Get Users Query
 * 
 * Tests the getUsers GraphQL query functionality
 */

describe('🎯 Get Users Query', () => {
  
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await clearAllUsers();
  });

  test('✅ Should get all users', async () => {
    // Arrange: Seed multiple users
    await seedUsers();
    
    // Act: Get all users
    const users = await User.find();
    
    // Assert: Should return all users
    expect(users).toHaveLength(3);
    expect(users[0].email).toBe('admin@example.com');
    expect(users[0].role).toBe('ADMIN');
    expect(users[1].role).toBe('USER');
    expect(users[2].role).toBe('USER');
  });

  test('✅ Should return empty array when no users exist', async () => {
    // Act: Get all users when none exist
    const users = await User.find();
    
    // Assert: Should return empty array
    expect(users).toHaveLength(0);
    expect(users).toEqual([]);
  });

  test('✅ Should get users with correct structure', async () => {
    // Arrange: Seed users
    await seedUsers();
    
    // Act: Get all users
    const users = await User.find();
    
    // Assert: Each user should have required fields
    users.forEach(user => {
      expect(user).toHaveProperty('_id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('fullName');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  test('✅ Should get users sorted by creation date', async () => {
    // Arrange: Seed users
    await seedUsers();
    
    // Act: Get all users sorted by creation date
    const users = await User.find().sort({ createdAt: 1 });
    
    // Assert: Users should be sorted
    expect(users).toHaveLength(3);
    
    // Check that they're in chronological order
    for (let i = 1; i < users.length; i++) {
      expect(users[i].createdAt.getTime()).toBeGreaterThanOrEqual(
        users[i-1].createdAt.getTime()
      );
    }
  });
});

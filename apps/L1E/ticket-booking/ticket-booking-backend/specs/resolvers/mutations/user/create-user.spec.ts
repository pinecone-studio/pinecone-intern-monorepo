import { User } from '../../../../src/models/user.model';
import { connectToDatabase } from '../../../../src/utils/database';
import { clearAllUsers } from '../../../../src/utils/seed-data';

/**
 * 🧪 Test: Create User Mutation
 * 
 * Tests the createUser GraphQL mutation functionality
 */

describe('🎯 Create User Mutation', () => {
  
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await clearAllUsers();
  });

  test('✅ Should create user with all required fields', async () => {
    // Arrange: User data
    const userData = {
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      role: 'USER' as const,
      phone: '+1234567890'
    };

    // Act: Create user
    const user = new User(userData);
    const savedUser = await user.save();
    
    // Assert: User should be created with correct data
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.fullName).toBe(userData.fullName);
    expect(savedUser.role).toBe(userData.role);
    expect(savedUser.phone).toBe(userData.phone);
    expect(savedUser._id).toBeDefined();
    expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.updatedAt).toBeDefined();
  });

  test('✅ Should create user with default role when not specified', async () => {
    // Arrange: User data without role
    const userData = {
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      phone: '+1234567890'
    };

    // Act: Create user
    const user = new User(userData);
    const savedUser = await user.save();
    
    // Assert: Should default to 'USER' role
    expect(savedUser.role).toBe('USER');
  });

  test('❌ Should not create user with duplicate email', async () => {
    // Arrange: Create first user
    const userData = {
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      role: 'USER' as const
    };

    const firstUser = new User(userData);
    await firstUser.save();

    // Act & Assert: Try to create second user with same email
    const duplicateUser = new User({
      ...userData,
      fullName: 'Another User'
    });

    await expect(duplicateUser.save()).rejects.toThrow();
  });

  test('❌ Should not create user without required fields', async () => {
    // Arrange: Invalid user data (missing required fields)
    const invalidUser = new User({
      role: 'USER'
      // Missing email, fullName, password
    });

    // Act & Assert: Should throw validation error
    await expect(invalidUser.save()).rejects.toThrow();
  });

  test('❌ Should not create user with invalid role', async () => {
    // Arrange: User data with invalid role
    const userData = {
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      role: 'INVALID_ROLE' // Not in enum
    };

    // Act & Assert: Should throw validation error
    const user = new User(userData);
    await expect(user.save()).rejects.toThrow();
  });

  test('✅ Should create admin user', async () => {
    // Arrange: Admin user data
    const adminData = {
      email: 'admin@example.com',
      fullName: 'Admin User',
      password: 'admin123',
      role: 'ADMIN' as const,
      phone: '+1234567890'
    };

    // Act: Create admin user
    const admin = new User(adminData);
    const savedAdmin = await admin.save();
    
    // Assert: Should be created as admin
    expect(savedAdmin.role).toBe('ADMIN');
    expect(savedAdmin.email).toBe(adminData.email);
  });
});

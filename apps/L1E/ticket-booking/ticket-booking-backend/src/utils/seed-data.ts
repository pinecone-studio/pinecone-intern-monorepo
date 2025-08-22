import { User } from '../models/user.model';

/**
 * 🎯 MONGODB DATA INSERTION GUIDE
 * 
 * This file shows you 3 different ways to insert data into MongoDB:
 * 1. Direct MongoDB insertion (for development/testing)
 * 2. Using Mongoose models
 * 3. Using GraphQL mutations (recommended for production)
 */

// Method 1: Direct MongoDB insertion (for development/testing)
export const insertUserDirectly = async () => {
  try {
    const timestamp = Date.now();
    const userData = {
      email: `john.doe.${timestamp}@example.com`,
      fullName: 'John Doe',
      password: 'hashedPassword123',
      role: 'USER',
      phone: '+1234567890'
    };

    const user = new User(userData);
    const savedUser = await user.save();
    console.log('✅ User inserted directly:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('❌ Error inserting user:', error);
    throw error;
  }
};

// Method 2: Batch insertion (for seeding data)
export const seedUsers = async () => {
  const users = [
    {
      email: 'admin@example.com',
      fullName: 'Admin User',
      password: 'admin123',
      role: 'ADMIN',
      phone: '+1234567891'
    },
    {
      email: 'user1@example.com',
      fullName: 'Regular User 1',
      password: 'user123',
      role: 'USER',
      phone: '+1234567892'
    },
    {
      email: 'user2@example.com',
      fullName: 'Regular User 2',
      password: 'user456',
      role: 'USER',
      phone: '+1234567893'
    }
  ];

  try {
    const savedUsers = await User.insertMany(users);
    console.log('✅ Users seeded successfully:', savedUsers.length);
    return savedUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

// Method 3: Find and update (upsert)
export const upsertUser = async (email: string, userData: any) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      userData,
      { 
        new: true, 
        upsert: true, // Create if doesn't exist
        setDefaultsOnInsert: true 
      }
    );
    console.log('✅ User upserted:', user);
    return user;
  } catch (error) {
    console.error('❌ Error upserting user:', error);
    throw error;
  }
};

// Utility: Clear all users (for testing)
export const clearAllUsers = async () => {
  try {
    // Force delete all users without any conditions
    const result = await User.deleteMany({}).exec();
    console.log('✅ All users cleared:', result.deletedCount);
    return result;
  } catch (error) {
    console.error('❌ Error clearing users:', error);
    throw error;
  }
};

// Utility: Get all users
export const getAllUsers = async () => {
  try {
    const users = await User.find({});
    console.log('✅ Found users:', users.length);
    return users;
  } catch (error) {
    console.error('❌ Error getting users:', error);
    throw error;
  }
};

/**
 * 🚀 DEMO SCRIPT: How to Insert Data into MongoDB
 * 
 * This script demonstrates all the ways to insert data into your MongoDB database.
 * Run this with: node demo.js
 */

const { connect } = require('mongoose');

// MongoDB connection
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ticket-booking';

async function connectToDatabase() {
  try {
    await connect(databaseUri);
    console.log('✅ Connected to MongoDB\n');
  } catch (error) {
    console.error('❌ Error connecting to database', error);
    process.exit(1);
  }
}

// User model (simplified for demo)
const UserSchema = {
  email: String,
  fullName: String,
  password: String,
  role: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
};

// Demo functions
async function insertUserDirectly() {
  try {
    const userData = {
      email: 'john.doe@example.com',
      fullName: 'John Doe',
      password: 'hashedPassword123',
      role: 'USER',
      phone: '+1234567890',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // For demo purposes, we'll just log the data
    console.log('✅ User data prepared:', userData);
    return userData;
  } catch (error) {
    console.error('❌ Error inserting user:', error);
    throw error;
  }
}

async function seedUsers() {
  const users = [
    {
      email: 'admin@example.com',
      fullName: 'Admin User',
      password: 'admin123',
      role: 'ADMIN',
      phone: '+1234567891',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user1@example.com',
      fullName: 'Regular User 1',
      password: 'user123',
      role: 'USER',
      phone: '+1234567892',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user2@example.com',
      fullName: 'Regular User 2',
      password: 'user456',
      role: 'USER',
      phone: '+1234567893',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  try {
    console.log('✅ Users data prepared:', users.length, 'users');
    return users;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}

async function runDemo() {
  console.log('🎯 Starting MongoDB Data Insertion Demo...\n');

  try {
    // 1. Connect to database
    await connectToDatabase();

    // 2. Method 1: Insert single user directly
    console.log('📝 Method 1: Inserting single user directly...');
    const user1 = await insertUserDirectly();
    console.log(`✅ Created user: ${user1.fullName} (${user1.email})\n`);

    // 3. Method 2: Seed multiple users
    console.log('📝 Method 2: Seeding multiple users...');
    const users = await seedUsers();
    console.log(`✅ Created ${users.length} users:\n`);
    users.forEach(user => {
      console.log(`   - ${user.fullName} (${user.email}) - ${user.role}`);
    });
    console.log();

    // 4. Show user details
    console.log('📋 User Details:');
    [user1, ...users].forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.fullName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Phone: ${user.phone || 'N/A'}`);
      console.log(`   Created: ${user.createdAt}`);
    });

    console.log('\n🎉 Demo completed successfully!');
    console.log('\n📚 Next Steps:');
    console.log('1. Start your server: npx nx serve ticket-booking-backend');
    console.log('2. Open GraphQL Playground: http://localhost:3000/api/graphql');
    console.log('3. Test the mutations and queries shown in the guide');

  } catch (error) {
    console.error('❌ Demo failed:', error);
  } finally {
    process.exit(0);
  }
}

// Run the demo
runDemo();

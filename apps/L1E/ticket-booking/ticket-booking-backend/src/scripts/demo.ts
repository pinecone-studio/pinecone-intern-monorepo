import { connectToDatabase } from '../utils/database';
import { 
  insertUserDirectly, 
  seedUsers, 
  getAllUsers, 
  clearAllUsers,
  upsertUser 
} from '../utils/seed-data';

/**
 * 🚀 DEMO SCRIPT: How to Insert Data into MongoDB
 * 
 * This script demonstrates all the ways to insert data into your MongoDB database.
 * Run this with: npx ts-node src/scripts/demo.ts
 */

async function runDemo() {
  console.log('🎯 Starting MongoDB Data Insertion Demo...\n');

  try {
    // 1. Connect to database
    await connectToDatabase();
    console.log('✅ Connected to MongoDB\n');

    // 2. Clear existing data
    await clearAllUsers();
    console.log('🧹 Cleared existing users\n');

    // 3. Method 1: Insert single user directly
    console.log('📝 Method 1: Inserting single user directly...');
    const user1 = await insertUserDirectly();
    console.log(`✅ Created user: ${user1.fullName} (${user1.email})\n`);

    // 4. Method 2: Seed multiple users
    console.log('📝 Method 2: Seeding multiple users...');
    const users = await seedUsers();
    console.log(`✅ Created ${users.length} users:\n`);
    users.forEach(user => {
      console.log(`   - ${user.fullName} (${user.email}) - ${user.role}`);
    });
    console.log();

    // 5. Method 3: Upsert (update or insert)
    console.log('📝 Method 3: Upserting user...');
    const upsertedUser = await upsertUser('john.doe@example.com', {
      fullName: 'John Doe Updated',
      phone: '+9999999999'
    });
    console.log(`✅ Upserted user: ${upsertedUser.fullName}\n`);

    // 6. Get all users
    console.log('📝 Getting all users...');
    const allUsers = await getAllUsers();
    console.log(`✅ Total users in database: ${allUsers.length}\n`);

    // 7. Show user details
    console.log('📋 User Details:');
    allUsers.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.fullName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Phone: ${user.phone || 'N/A'}`);
      console.log(`   Created: ${user.createdAt}`);
    });

    console.log('\n🎉 Demo completed successfully!');

  } catch (error) {
    console.error('❌ Demo failed:', error);
  }
}

// Run the demo if this file is executed directly
if (require.main === module) {
  runDemo();
}

export { runDemo };

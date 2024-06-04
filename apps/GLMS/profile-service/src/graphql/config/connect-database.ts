import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDatabase() {
  const DATABASE_URI = process.env.MONGODB_URI;
  console.log(DATABASE_URI);
  
  try {
    if (!DATABASE_URI) {
      return;
    }
    await mongoose.connect(DATABASE_URI);
  } catch (error) {
    console.error(`Failed to connect to database: ${error}`);
  }
}
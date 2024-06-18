import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connection = {
  isConnected: 0,
};

export async function connectDatabase() {
  const DATABASE_URI = process.env.MONGODB_URI!;

  if (connection.isConnected > 0) {
    return;
  }

  try {
    const dbConnection = await connect(DATABASE_URI);
    connection.isConnected = dbConnection.connections[0].readyState;
  } catch (error) {
    console.log('RR', error);
    throw new Error('Failed to connect to database');
  }
}

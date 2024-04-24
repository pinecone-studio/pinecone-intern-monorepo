import mongoose from 'mongoose';

export const connection = {
  isConnected: 0,
};

export async function connectToDatabase() {
  const DATABASE_URI = process.env.MONGODB_URI!;

  if (connection.isConnected > 0) {
    return;
  }

  try {
    const dbConnection = await mongoose.connect(DATABASE_URI);
    connection.isConnected = dbConnection.connections[0].readyState;
  } catch (error) {
    throw new Error('Failed to connect to database');
  }
}

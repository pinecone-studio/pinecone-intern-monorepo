import { connect } from 'mongoose';
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
    console.log('Connected!');
  } catch (error) {
    throw new Error('Failed to connect to database');
  }
}

import mongoose from 'mongoose';

export const connection = {
  isConnected: 0,
};

export const connectToDatabase = async () => {
  const databaseUri = process.env.MONGODB_URI;

  if (connection.isConnected > 0) {
    return;
  }

  try {
    const connectedDB = await mongoose.connect(databaseUri!);
    connection.isConnected = connectedDB.connections[0].readyState;
  } catch (error) {
    throw new Error('Database connection failed');
  }
};

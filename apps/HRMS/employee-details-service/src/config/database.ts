import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://nakii:4jPCRcULEheHUSD2@cluster0.l6kcwbb.mongodb.net/HRMS?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};


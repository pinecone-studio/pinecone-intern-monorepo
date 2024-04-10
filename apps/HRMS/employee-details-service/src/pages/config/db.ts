import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://batchuluun:XN2IklfthS9eVHa9@gql.oxxl7ma.mongodb.net/?retryWrites=true&w=majority&appName=gql`);
    console.log('connected');
  } catch (error) {
    throw new Error('Error connecting to database');
  }
};

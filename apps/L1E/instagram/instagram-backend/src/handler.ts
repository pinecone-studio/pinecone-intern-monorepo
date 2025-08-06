import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { NextRequest } from 'next/server';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import mongoose from 'mongoose';

interface Context {
  req: NextRequest;
  user?: {
    id: string;
    email: string;
  };
}


const MONGODB_URI = process.env.MONGODB_URI ;


let dbConnection: mongoose.Connection | null = null;

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
   
    if (!dbConnection) {
      if (!MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }
      try {
        await mongoose.connect(MONGODB_URI, {
          serverSelectionTimeoutMS: 5000, 
        });
        dbConnection = mongoose.connection;        
        dbConnection.on('error', (err) => console.error('MongoDB connection error:', err));
        dbConnection.on('disconnected', () => console.log('MongoDB disconnected'));
        dbConnection.on('reconnected', () => console.log('MongoDB reconnected'));
        
        console.log('MongoDB connected successfully');
      } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('Database connection failed');
      }
    }

    
    return { req };
  },
});
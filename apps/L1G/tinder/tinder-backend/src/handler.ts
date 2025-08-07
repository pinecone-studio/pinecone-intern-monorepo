import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import connectToDB from './utils/connect-to-db';
import { Context } from './types';

connectToDB();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    let userId: string | undefined = undefined;

    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      if (typeof decoded === 'object' && decoded.userId) {
        userId = decoded.userId;
      }
    } catch (error) {
      console.warn('Invalid or missing JWT:', error);
    }

    return { userId };
  },
});

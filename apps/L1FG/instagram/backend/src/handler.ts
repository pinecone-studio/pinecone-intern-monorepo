import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import { connectToDb } from './utils/connect-to-db';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Context } from './types';
connectToDb();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});
export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    const token = req.headers.get('authorization') || '';

    let userId = null;

    try {
      if (!process.env.SESSION_SECRET) {
        throw new Error('Session secret is not defined');
      }
      const decoded = jwt.verify(token, process.env.SESSION_SECRET) as JwtPayload;
      userId = decoded.userId;
    } catch {
      userId = null;
    }
    return {
      userId,
    };
  },
});

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Context } from './types';
import { NextRequest } from 'next/server';

function extractToken(authHeader: string): string {
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
}

async function verifyUserId(token: string): Promise<string | undefined> {
  const secret = process.env.JWT_SECRET || 'tinder';
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded.userId;
  } catch {
    return undefined;
  }
}

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(apolloServer, {
  context: async (req) => {
    const authHeader = req.headers.get('authorization') || '';
    const token = extractToken(authHeader);
    const userId = await verifyUserId(token);
    return { userId };
  },
});

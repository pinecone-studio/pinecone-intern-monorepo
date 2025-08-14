import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import connectToDB from './utils/connect-to-db';
import { Context } from './types';
import dotenv from 'dotenv';
dotenv.config();

connectToDB();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});
function extractToken(authHeader: string): string {
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
}

function ensureJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    // throw new Error('JWT_SECRET is not defined bro');
    return 'tinder';
  }
  return process.env.JWT_SECRET;
}

function decodeToken(token: string, secret: string): JwtPayload | null {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    console.warn('Invalid or missing JWT:', err);
    return null;
  }
}

function extractUserId(decoded: JwtPayload | null): string | undefined {
  return decoded && typeof decoded === 'object' && decoded.userId ? decoded.userId : undefined;
}

function verifyUserId(token: string): string | undefined {
  const secret = ensureJwtSecret();
  const decoded = decodeToken(token, secret);
  return extractUserId(decoded);
}

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    const authHeader = req.headers.get('authorization') || '';
    const token = extractToken(authHeader);
    const userId = verifyUserId(token);

    return { userId };
  },
});

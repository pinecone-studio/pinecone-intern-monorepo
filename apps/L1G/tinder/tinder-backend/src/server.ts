import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { resolvers } from './resolvers';
import connectToDB from './utils/connect-to-db';
import { Context } from './types';
import dotenv from 'dotenv';
import { NextRequest } from 'next/server';

dotenv.config();

const app = express();

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

connectToDB()
  .then(() => {
    apolloServer.start().then(() => {
      app.use(
        '/api/graphql',
        expressMiddleware(apolloServer, {
          context: async ({ req }) => {
            const authHeader = req.headers['authorization'] || '';
            const token = extractToken(authHeader);
            const userId = await verifyUserId(token);
            return { userId };
          },
        })
      );

      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
        console.log(`GraphQL server running on port ${PORT}`);
      });
    });
  })
  .catch((err) => {
    console.error('Failed to start the server:', err);
    process.exit(1);
  });

function extractToken(authHeader: string): string {
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
}

function ensureJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
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
  return decoded && decoded.userId ? decoded.userId : undefined;
}

async function verifyUserId(token: string): Promise<string | undefined> {
  const secret = ensureJwtSecret();
  const decoded = decodeToken(token, secret);
  return extractUserId(decoded);
}

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(apolloServer, {
  context: async (req) => {
    const authHeader = req.headers.get('authorization') || '';
    const token = extractToken(authHeader);
    const userId = await verifyUserId(token);
    return { userId };
  },
});

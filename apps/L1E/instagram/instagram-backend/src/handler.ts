import { NextRequest, NextResponse } from 'next/server';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from './resolvers';
import { typeDefs } from './schemas';
import { getJwtSecret } from './utils/check-jwt';
import jwt from "jsonwebtoken";
import { connectToDb } from './utils/connect-to-db';
import 'dotenv/config';

connectToDb();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  csrfPrevention: false,
});


const apolloHandler = startServerAndCreateNextHandler(server, {
  context: async ({ req }: any) => {
    try {
      const header = req.headers.get('authorization') || req.headers.get('Authorization') || '';
      const token = header.startsWith('Bearer ') ? header.slice(7) : '';
      if (!token) return { userId: null };
      const decoded = jwt.verify(token, getJwtSecret()) as { userId?: string };
      return { userId: decoded?.userId ?? null };
    } catch (err) {
      console.error('Context token error:', err);
      return { userId: null };
    }
  },
});


export async function handler(req: NextRequest) {

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  
  const response = await apolloHandler(req);


  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

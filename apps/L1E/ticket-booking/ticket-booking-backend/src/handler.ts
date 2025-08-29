import { NextRequest, NextResponse } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { resolvers} from './resolvers'
import { typeDefs } from './schemas';
import { connectToDatabase } from './utils/database';

connectToDatabase();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

const apolloHandler = startServerAndCreateNextHandler(server);

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

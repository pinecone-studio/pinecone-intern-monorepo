import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import { connectToDb } from './utils/connect-to-db';

connectToDb();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
  plugins: [
    {
      requestDidStart: async () => {
        return {
          willSendResponse: async (context) => {
            context.response.http.headers.set('Access-Control-Allow-Origin', '*');
            context.response.http.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            context.response.http.headers.set('Access-Control-Allow-Headers', 'Content-Type');
          },
        };
      },
    },
  ],
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    return { req };
  },
});

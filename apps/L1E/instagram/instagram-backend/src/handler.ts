import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { NextRequest } from 'next/server';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { connectToDb } from './utils/connect-to-db';

connectToDb()

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async () => {
    return {};
  },
});

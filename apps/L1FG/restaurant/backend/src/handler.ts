import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import { connectToDb } from './utils/connect-to-db';
import { typeDefs } from './schemas';
import { foodTypeDefs } from './schemas/food.schema';

const mergedTypeDefs = [typeDefs, foodTypeDefs];

connectToDb();

const server = new ApolloServer({
  resolvers,
  typeDefs: mergedTypeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    return { req };
  },
});

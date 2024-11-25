import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schemas';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import { connectToDb } from './utils/connect-to-db';
import jwt from 'jsonwebtoken';
import { User } from './types';

connectToDb();

const server = new ApolloServer<Context>({
  resolvers,
  typeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    try {
      const authorization = req.headers.get('Authorization');
      if (!authorization) return { user: null };

      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as User;
      return { user: decoded };
    } catch (error) {
      return { user: null };
    }
  },
});

export type Context = {
  user: User | null;
};

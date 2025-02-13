import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { resolvers } from './resolvers';
import { connectToDb } from './utils/connect-to-db';
import { typeDefs } from './schemas';
import { foodTypeDefs } from './schemas/food.schema';
import { categoryTypeDefs } from './schemas/category.schema';
import { userTypeDefs } from './schemas/user.schema';
import jwt, { JwtPayload } from 'jsonwebtoken';

const mergedTypeDefs = [typeDefs, foodTypeDefs, categoryTypeDefs, userTypeDefs];

connectToDb();

const server = new ApolloServer({
  resolvers,
  typeDefs: mergedTypeDefs,
  introspection: true,
});

export const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const token = req.headers.get('authorization') || '';

    let userId = null;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      userId = decoded.userId;
    } catch {
      userId = null;
    }

    return {
      userId,
    };
  },
});

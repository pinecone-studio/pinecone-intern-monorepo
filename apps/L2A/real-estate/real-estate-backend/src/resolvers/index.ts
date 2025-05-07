import * as Mutation from './mutations';
import * as Query from './queries';
import { typeDefs } from '../schemas/index';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchema } from 'graphql';

export const _service = () => {
  const schema = makeExecutableSchema({ typeDefs });
  const schemaString = printSchema(schema);
  return {
    sdl: schemaString,
  };
};

export const resolvers = {
  Mutation,
  Query,
};

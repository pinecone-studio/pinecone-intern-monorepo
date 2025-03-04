import { typeDefs } from '@/graphql/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { printSchema } from 'graphql';

export const _service = () => {
  const schema = makeExecutableSchema({ typeDefs });
  const schemaString = printSchema(schema);
  return {
    sdl: schemaString,
  };
};

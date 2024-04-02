import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloArticlesSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloArticlesSchema]);

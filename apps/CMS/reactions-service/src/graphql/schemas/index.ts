import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloReactionsSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloReactionsSchema]);

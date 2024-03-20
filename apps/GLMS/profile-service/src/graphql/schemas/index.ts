import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloProfileSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloProfileSchema]);

import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloProfileSchema } from './hello.schema';
import { challengeTypeDefs } from './challenge.schema';

export const typeDefs = mergeTypeDefs([helloProfileSchema, challengeTypeDefs]);

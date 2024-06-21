import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloProfileSchema } from './hello.schema';
import { glmsUserTypeDefs } from './user.schema';

export const typeDefs = mergeTypeDefs([helloProfileSchema, glmsUserTypeDefs]);

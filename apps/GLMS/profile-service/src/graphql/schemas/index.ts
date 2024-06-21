import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloProfileSchema } from './hello.schema';
import { userTypeDefs } from './user.schema';

export const typeDefs = mergeTypeDefs([helloProfileSchema, userTypeDefs]);

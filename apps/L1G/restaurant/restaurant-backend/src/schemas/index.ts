import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';
import { authTypeDefs } from './auth.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs]);

import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs]);

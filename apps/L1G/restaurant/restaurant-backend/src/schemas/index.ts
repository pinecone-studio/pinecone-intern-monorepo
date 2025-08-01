import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';
import { authTypeDefs } from './auth.schema';
import { categoryTypeDefs } from './category.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs, categoryTypeDefs]);

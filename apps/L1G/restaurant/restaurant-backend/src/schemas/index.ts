import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';
import { authTypeDefs } from './auth.schema';
import { categoryTypeDefs } from './category.schema';
import { tableTypeDefs } from './table.schema';
export const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs, tableTypeDefs,categoryTypeDefs]);


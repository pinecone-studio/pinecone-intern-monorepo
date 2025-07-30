import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';
import { authTypeDefs } from './auth.schema';
import { menuCategoryTypeDefs } from './menu-category.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs, menuCategoryTypeDefs]);

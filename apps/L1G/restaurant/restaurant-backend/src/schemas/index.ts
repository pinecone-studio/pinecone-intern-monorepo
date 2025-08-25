import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';
import { authTypeDefs } from './auth.schema';
import { categoryTypeDefs } from './category.schema';
import { tableTypeDefs } from './table.schema';
import { foodTypeDefs } from './food.schema';
import { discountTypeDefs } from './discount.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs, tableTypeDefs, categoryTypeDefs, foodTypeDefs, discountTypeDefs]);

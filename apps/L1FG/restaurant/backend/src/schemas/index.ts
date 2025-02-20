import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { userTypeDefs } from './user.schema';
import { foodTypeDefs } from './food.schema';
import { categoryTypeDefs } from './category.schema';
import { tableTypeDefs } from './table.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, userTypeDefs, foodTypeDefs, categoryTypeDefs, tableTypeDefs]);

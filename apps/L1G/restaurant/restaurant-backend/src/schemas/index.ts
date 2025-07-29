import { mergeTypeDefs } from '@graphql-tools/merge';
import { userTypeDefs } from './user.schema';
import { authTypeDefs } from './auth.schema';
import { foodTypeDefs } from './food.schema';

export const typeDefs = mergeTypeDefs([userTypeDefs, authTypeDefs, foodTypeDefs]);

import { mergeTypeDefs } from '@graphql-tools/merge';
import { categoryTypeDefs } from './category.schema';

export const typeDefs = mergeTypeDefs([categoryTypeDefs]);

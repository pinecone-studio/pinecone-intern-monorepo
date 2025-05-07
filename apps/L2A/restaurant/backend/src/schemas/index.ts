import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as ProductTypeDefs } from './product.schema';
import { typeDefs as CategoryTypeDefs } from './category.schema';
import { typeDefs as TableTypeDefs } from './table.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, ProductTypeDefs, CategoryTypeDefs, TableTypeDefs]);

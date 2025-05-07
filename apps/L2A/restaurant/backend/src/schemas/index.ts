import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as ProductTypeDefs } from './product.schema';
import { typeDefs as CategoryTypeDefs } from './category.schema';
import { typeDefs as TableTypeDefs } from './table.schema';
import { OrderTypeDefs } from './order.schema';
import { UserTypeDefs } from './user.schema';
import { QueryTypeDefs } from './query.schema';
import { MutationTypeDefs } from './mutation.schema';

export const typeDefs = mergeTypeDefs([
  CommonTypeDefs,
  ProductTypeDefs,
  CategoryTypeDefs,
  TableTypeDefs,
  OrderTypeDefs,
  UserTypeDefs,
  QueryTypeDefs,
  MutationTypeDefs
]);

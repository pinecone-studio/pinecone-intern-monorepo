import { mergeTypeDefs } from '@graphql-tools/merge';
import { categoryTypeDefs } from './category.schema';
import { articleTypeDefs } from './articles.schema';

export const typeDefs = mergeTypeDefs([categoryTypeDefs, articleTypeDefs]);

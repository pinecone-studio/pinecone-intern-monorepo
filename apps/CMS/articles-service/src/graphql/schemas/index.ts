import { mergeTypeDefs } from '@graphql-tools/merge';
import { categoryTypeDefs } from './category.schema';
import { helloArticlesSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloArticlesSchema, categoryTypeDefs]);

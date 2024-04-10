import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloArticlesSchema } from './hello.schema';
import { articleSchema } from './article.schema';
import { categorySchema } from './category.schema';

export const typeDefs = mergeTypeDefs([helloArticlesSchema, articleSchema, categorySchema]);

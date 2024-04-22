import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloArticlesSchema } from './hello.schema';
import { articleSchema } from './article.schema';
import { categorySchema } from './category.schema';
import { userSchema } from './user.schema';
import { reactionSchema } from './reaction.schema';

export const typeDefs = mergeTypeDefs([helloArticlesSchema, articleSchema, categorySchema, userSchema, reactionSchema]);

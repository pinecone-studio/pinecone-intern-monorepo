import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloArticlesSchema } from './hello.schema';
import { UserSchema } from './user.schema';

export const typeDefs = mergeTypeDefs([helloArticlesSchema, UserSchema]);

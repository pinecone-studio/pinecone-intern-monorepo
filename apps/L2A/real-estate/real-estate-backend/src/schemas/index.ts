import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as PostTypeDefs } from './post.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs,PostTypeDefs,]);

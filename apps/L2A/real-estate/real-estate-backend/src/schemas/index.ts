import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as PostTypeDefs } from './post.schema';
import { typeDefs as ServiceTypeDefs } from './service.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, PostTypeDefs, ServiceTypeDefs]);

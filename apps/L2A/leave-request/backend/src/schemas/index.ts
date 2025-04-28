import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as UserTypeDefs } from './user.schema';
import { typeDefs as RequestTypeTypeDefs } from './request-type.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, RequestTypeTypeDefs]);

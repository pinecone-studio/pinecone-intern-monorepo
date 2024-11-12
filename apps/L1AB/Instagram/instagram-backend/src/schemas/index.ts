import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { UserTypeDefs } from './user-schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs]);

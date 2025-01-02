import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as UserTypeDefs } from './user.schema';
import { typeDefs as MatchTypeDefs } from './match.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, MatchTypeDefs]);

import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { typeDefs as UserTypeDefs } from './user.schema';
import { typeDefs as MatchTypeDefs } from './match.schema';
import { typeDefs as SwipeTypeDefs } from './swipe.schema';
import { typeDefs as ChattypeDefs } from './chat.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, UserTypeDefs, MatchTypeDefs, SwipeTypeDefs, ChattypeDefs]);

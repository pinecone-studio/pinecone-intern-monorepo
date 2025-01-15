import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { concertTypeDefs } from './concert.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, concertTypeDefs]);

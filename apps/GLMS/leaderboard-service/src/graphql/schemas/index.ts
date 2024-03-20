import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloLeaderboardSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloLeaderboardSchema]);

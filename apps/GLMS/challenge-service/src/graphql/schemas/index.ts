import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloChallengeSchema } from './hello.schema';
import { challengeTypeDefs } from './challenge.schema';

export const typeDefs = mergeTypeDefs([helloChallengeSchema, challengeTypeDefs]);

import { mergeTypeDefs } from '@graphql-tools/merge';
import { helloChallengeSchema } from './hello.schema';

export const typeDefs = mergeTypeDefs([helloChallengeSchema]);

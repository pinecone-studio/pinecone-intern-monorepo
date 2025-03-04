import { mergeTypeDefs } from '@graphql-tools/merge';
import { commonTypeDefs } from './common.schema';

export const typeDefs = mergeTypeDefs([commonTypeDefs]);

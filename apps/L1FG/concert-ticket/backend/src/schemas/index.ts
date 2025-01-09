import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as CommonTypeDefs } from './common.schema';
import { testTypeDefs } from './test.schema';

export const typeDefs = mergeTypeDefs([CommonTypeDefs, testTypeDefs]);

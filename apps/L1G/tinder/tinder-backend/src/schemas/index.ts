import { mergeTypeDefs } from '@graphql-tools/merge';
import { UsertypeDefs } from './user';
import { InterestsTypeDefs } from './interests.schema';

export const typeDefs = mergeTypeDefs([UsertypeDefs, InterestsTypeDefs]);

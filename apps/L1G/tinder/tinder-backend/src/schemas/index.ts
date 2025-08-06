import { mergeTypeDefs } from '@graphql-tools/merge';
import { UsertypeDefs } from './user.schema';
import { InterestsDefs } from './interests.schema';

export const typeDefs = mergeTypeDefs([UsertypeDefs, InterestsDefs]);

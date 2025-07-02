import { mergeTypeDefs } from '@graphql-tools/merge';
import { UsertypeDefs } from './user';

export const typeDefs = mergeTypeDefs([UsertypeDefs]);
